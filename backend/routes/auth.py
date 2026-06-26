from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from database import get_db
from models.student import Student
from models.admin import Admin
from schemas.student import StudentCreate, StudentOut
from schemas.admin import AdminCreate, AdminOut
from schemas.auth import TokenResponse

from services.auth import (
    hash_password,
    verify_password,
    create_access_token,
    find_user_by_email,
    get_current_user,
    verify_google_token,
    create_password_reset_token,
    verify_password_reset_token,
    send_password_reset_email,
    update_user_password,
)

router = APIRouter(prefix="/auth", tags=["auth"])


# ─────────────────────────────────────────────────────
# REQUEST/RESPONSE SHAPES SPECIFIC TO THIS FILE
# ─────────────────────────────────────────────────────

class GoogleLoginRequest(BaseModel):
    id_token: str
    role: str  # "student" or "admin" — frontend must say which login screen this came from


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str


# ─────────────────────────────────────────────────────
# REGISTER
# ─────────────────────────────────────────────────────

@router.post("/register/student", response_model=StudentOut)
def register_student(payload: StudentCreate, db: Session = Depends(get_db)):
    existing, _ = find_user_by_email(db, payload.email)
    if existing:
        raise HTTPException(400, "Email already registered")

    student = Student(
        enrollment_no=payload.enrollment_no,
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        course=payload.course,
        semester=payload.semester,
        session=payload.session,
        gender=payload.gender,
        password_hash=hash_password(payload.password),
    )
    db.add(student)
    db.commit()
    db.refresh(student)
    return student


@router.post("/register/admin", response_model=AdminOut)
def register_admin(payload: AdminCreate, db: Session = Depends(get_db)):
    existing, _ = find_user_by_email(db, payload.email)
    if existing:
        raise HTTPException(400, "Email already registered")

    admin = Admin(
        name=payload.name,
        email=payload.email,
        department=payload.department,
        password_hash=hash_password(payload.password),
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin


# ─────────────────────────────────────────────────────
# LOGIN — email + password
# ─────────────────────────────────────────────────────

@router.post("/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    form_data.username is actually the email (OAuth2 form spec calls it 'username').
    Checks Student, Admin, Superuser tables — whichever one matches.
    """
    user, role = find_user_by_email(db, form_data.username)

    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(401, "Invalid email or password")

    token = create_access_token({"sub": str(user.id), "role": role})
    return {"access_token": token, "token_type": "bearer", "role": role}


# ─────────────────────────────────────────────────────
# GOOGLE LOGIN
# ─────────────────────────────────────────────────────

@router.post("/google-login", response_model=TokenResponse)
def google_login(payload: GoogleLoginRequest, db: Session = Depends(get_db)):
    """
    Frontend flow:
      1. User clicks "Sign in with Google" (Google's official button/SDK)
      2. Google returns an id_token to the frontend
      3. Frontend sends that id_token here, along with which role screen they're on

    We verify the token is real, then either log the user in (if their email
    already exists) or tell the frontend they need to register first.
    We do NOT auto-register here — registration needs roll_no/course/etc,
    which Google doesn't provide.
    """
    google_data = verify_google_token(payload.id_token)
    email = google_data["email"]

    user, role = find_user_by_email(db, email)

    if not user:
        raise HTTPException(
            404,
            "No account found for this Google email. Please register first."
        )

    if role != payload.role:
        raise HTTPException(
            403,
            "Account not found for this login type."
        )

    token = create_access_token({"sub": str(user.id), "role": role})
    return {"access_token": token, "token_type": "bearer", "role": role}


# ─────────────────────────────────────────────────────
# FORGOT PASSWORD — request a reset link
# ─────────────────────────────────────────────────────

@router.post("/forgot-password")
def forgot_password(payload: ForgotPasswordRequest, db: Session = Depends(get_db)):
    """
    Always returns the same generic message, whether or not the email exists.
    This stops attackers from using this endpoint to discover which emails
    are registered in the system.
    """
    user, role = find_user_by_email(db, payload.email)

    if user:
        reset_token = create_password_reset_token(payload.email, role)
        send_password_reset_email(payload.email, reset_token)

    return {"message": "If an account exists for this email, a reset link has been sent."}


# ─────────────────────────────────────────────────────
# RESET PASSWORD — actually set the new password
# ─────────────────────────────────────────────────────

@router.post("/reset-password")
def reset_password(payload: ResetPasswordRequest, db: Session = Depends(get_db)):
    token_data = verify_password_reset_token(payload.token)
    email = token_data["sub"]
    role = token_data["role"]

    user, found_role = find_user_by_email(db, email)
    if not user or found_role != role:
        raise HTTPException(400, "Invalid or expired reset token")

    if len(payload.new_password) < 8:
        raise HTTPException(400, "Password must be at least 8 characters")

    update_user_password(db, user, role, payload.new_password)
    return {"message": "Password has been reset successfully. You can now log in."}


# ─────────────────────────────────────────────────────
# CURRENT USER — useful for the frontend to check who's logged in
# ─────────────────────────────────────────────────────

@router.get("/me")
def get_me(current_user=Depends(get_current_user)):
    return {
        "id": str(current_user.id),
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role,
    }