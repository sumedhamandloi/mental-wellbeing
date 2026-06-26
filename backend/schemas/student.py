from pydantic import BaseModel, EmailStr
from datetime import datetime

class StudentCreate(BaseModel):
    enrollment_no: str
    name: str
    email: EmailStr
    phone: str
    gender: str
    course: str
    semester: int
    session: str
    password: str

class StudentOut(BaseModel):
    id: str
    enrollment_no: str
    name: str
    email: EmailStr
    phone: str
    gender: str
    course: str
    semester: int
    session: str
    created_at: datetime

    class Config:
        from_attributes = True