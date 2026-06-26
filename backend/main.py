from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from routes.auth import router as auth_router
from services import auth
from database import engine, Base, get_db
from models import test_models 


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Mental Well-Being Platform")

app.include_router(auth_router)

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