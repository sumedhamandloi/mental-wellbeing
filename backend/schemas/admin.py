from pydantic import BaseModel, EmailStr
from datetime import datetime

class AdminCreate(BaseModel):
    name: str
    email: EmailStr
    department: str
    password: str

class AdminOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    department: str
    created_at: datetime

    class Config:
        from_attributes = True