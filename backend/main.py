from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from services import auth
from database import engine, Base, get_db
from routes.auth import router as auth_router
from routes.quiz import router as quiz_router
from routes.admin import router as admin_router
from routes.student import router as student_router
from routes.superuser import router as superuser_router
from fastapi.middleware.cors import CORSMiddleware
from services.scheduling import start_scheduler

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Mental Well-Being Platform")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(quiz_router)
app.include_router(admin_router)
app.include_router(student_router)
app.include_router(superuser_router)


@app.on_event("startup")
def on_startup():
    start_scheduler()


@app.get("/")
def root():
    return {"message": "API is running"}


@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return {"status": "ok"}
    except Exception as e:
        return {"status": "error"}