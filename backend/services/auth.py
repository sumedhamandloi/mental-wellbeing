import os
import smtplib
import secrets
from email.mime.text import MIMEText
from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

from database import get_db
from models.student import Student
from models.admin import Admin
from models.superuser import Superuser

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)
# ─────────────────────────────────────────────────────
# CONFIG — read from .env
# ─────────────────────────────────────────────────────

SECRET_KEY = os.getenv("SECRET_KEY", "fallback-dev-secret-change-this")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 480))
RESET_TOKEN_EXPIRE_MINUTES = int(os.getenv("RESET_TOKEN_EXPIRE_MINUTES", 30))

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SMTP_FROM_EMAIL = os.getenv("SMTP_FROM_EMAIL")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


# ─────────────────────────────────────────────────────
# PASSWORD HASHING
# ─────────────────────────────────────────────────────

def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


# ─────────────────────────────────────────────────────
# JWT — ACCESS TOKENS (login sessions)
# ─────────────────────────────────────────────────────

def create_access_token(data: dict) -> str:
    """
    data must include 'sub' (user id) and 'role' (student/admin/superuser).
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire, "type": "access"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )


# ─────────────────────────────────────────────────────
# JWT — PASSWORD RESET TOKENS (short-lived, separate type)
# ─────────────────────────────────────────────────────

def create_password_reset_token(email: str, role: str) -> str:
    """
    Short-lived token, deliberately separate from access tokens.
    type='reset' stops a reset token being reused as a login token.
    """
    expire = datetime.utcnow() + timedelta(minutes=RESET_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": email, "role": role, "type": "reset", "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def verify_password_reset_token(token: str) -> dict:
    payload = decode_token(token)
    if payload.get("type") != "reset":
        raise HTTPException(400, "Invalid reset token")
    return payload  # {"sub": email, "role": role, "type": "reset", "exp": ...}


# ─────────────────────────────────────────────────────
# LOOKUP HELPERS — check all 3 tables by email
# ─────────────────────────────────────────────────────

def find_user_by_email(db: Session, email: str):
    """
    Returns (user_object, role_string) or (None, None) if not found.
    Checks Student, Admin, Superuser tables in that order.
    """
    student = db.query(Student).filter(Student.email == email).first()
    if student:
        return student, "student"

    admin = db.query(Admin).filter(Admin.email == email).first()
    if admin:
        return admin, "admin"

    superuser = db.query(Superuser).filter(Superuser.email == email).first()
    if superuser:
        return superuser, "superuser"

    return None, None


def get_user_by_id_and_role(db: Session, user_id: str, role: str):
    if role == "student":
        return db.query(Student).filter(Student.id == user_id).first()
    elif role == "admin":
        return db.query(Admin).filter(Admin.id == user_id).first()
    elif role == "superuser":
        return db.query(Superuser).filter(Superuser.id == user_id).first()
    return None


# ─────────────────────────────────────────────────────
# CURRENT USER DEPENDENCY — used by every protected route
# ─────────────────────────────────────────────────────

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = decode_token(token)

    if payload.get("type") != "access":
        raise HTTPException(401, "Invalid token type")

    user_id = payload.get("sub")
    role = payload.get("role")
    if not user_id or not role:
        raise HTTPException(401, "Could not validate credentials")

    user = get_user_by_id_and_role(db, user_id, role)
    if not user:
        raise HTTPException(401, "User not found")

    # Attach role to the object so routes/services can read current_user.role
    user.role = role
    return user


def require_role(*allowed_roles):
    """
    Dependency factory. Use as: Depends(require_role("admin"))
    or Depends(require_role("admin", "superuser")) for multiple allowed roles.
    """
    def checker(current_user=Depends(get_current_user)):
        if current_user.role not in allowed_roles:
            raise HTTPException(403, "Insufficient permissions")
        return current_user
    return checker


# ─────────────────────────────────────────────────────
# GOOGLE OAUTH — verify the ID token sent by the frontend
# ─────────────────────────────────────────────────────

def verify_google_token(google_id_token: str) -> dict:
    """
    The frontend uses Google's sign-in button/SDK to get an id_token,
    then sends it here. We verify it's genuinely from Google and
    actually meant for OUR app (checked via GOOGLE_CLIENT_ID).

    Returns Google's decoded payload, which includes:
      - email
      - name
      - email_verified
    """
    if not GOOGLE_CLIENT_ID:
        raise HTTPException(500, "Google login is not configured on the server")

    try:
        payload = id_token.verify_oauth2_token(
            google_id_token,
            google_requests.Request(),
            GOOGLE_CLIENT_ID
        )
    except ValueError:
        raise HTTPException(401, "Invalid Google token")

    if not payload.get("email_verified", False):
        raise HTTPException(401, "Google email not verified")

    return payload


# ─────────────────────────────────────────────────────
# EMAIL SENDING — for password reset links
# ─────────────────────────────────────────────────────

def send_password_reset_email(to_email: str, reset_token: str):
    """
    Sends a plain-text email with a reset link.
    FRONTEND_RESET_URL should point at your frontend's reset password page,
    which reads the token from the URL and calls /auth/reset-password.
    """
    if not SMTP_HOST or not SMTP_USERNAME:
        # SMTP not configured yet — don't crash the request, just log it.
        print(f"[DEV] SMTP not configured. Reset token for {to_email}: {reset_token}")
        return

    frontend_reset_url = os.getenv("FRONTEND_RESET_URL", "http://localhost:3000/reset-password")
    reset_link = f"{frontend_reset_url}?token={reset_token}"

    body = (
        f"We received a request to reset your password.\n\n"
        f"Click the link below to set a new password. "
        f"This link expires in {RESET_TOKEN_EXPIRE_MINUTES} minutes.\n\n"
        f"{reset_link}\n\n"
        f"If you didn't request this, you can safely ignore this email."
    )

    msg = MIMEText(body)
    msg["Subject"] = "Reset your Mental Well-Being Platform password"
    msg["From"] = SMTP_FROM_EMAIL
    msg["To"] = to_email

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
    except Exception as e:
        # Don't leak SMTP internals to the client — log server-side instead
        print(f"Failed to send reset email to {to_email}: {e}")
        raise HTTPException(500, "Failed to send reset email. Please try again later.")


def update_user_password(db: Session, user, role: str, new_password: str):
    user.password_hash = hash_password(new_password)
    db.commit()