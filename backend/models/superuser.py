from sqlalchemy import Column, String, TIMESTAMP
from datetime import datetime
import uuid
from database import Base

class Superuser(Base):
    __tablename__ = "superuser"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)