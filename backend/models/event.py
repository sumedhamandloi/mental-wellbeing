import uuid
from sqlalchemy import Column, String, Text, Date, Time, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(String, primary_key=True,default=lambda: str(uuid.uuid4()))
    admin_id = Column(String, ForeignKey("admins.id"), nullable=False)
    title = Column(String, nullable=False)
    venue = Column(String, nullable=False)
    event_date = Column(Date, nullable=False)
    event_time = Column(Time, nullable=False)
    status = Column(String, nullable=False, default="scheduled")
    # status = 'scheduled' | 'ongoing' | 'completed' | 'closed' | 'cancelled'
    description = Column(Text, nullable=True)
    cancelled_at = Column(DateTime(timezone=True), nullable=True)       # null unless cancelled
    cancellation_reason = Column(Text, nullable=True)                   # null unless cancelled
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # relationships
    admin = relationship("Admin", back_populates="events")
    report = relationship("EventReport", back_populates="event", uselist=False)  # one to one
    rsvps = relationship("EventRSVP", back_populates="event")
    quiz_templates = relationship("QuizTemplate", back_populates="event")


class EventReport(Base):
    __tablename__ = "event_report"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    event_id = Column(String, ForeignKey("events.id"), nullable=False, unique=True)
    # unique=True enforces one report per event
    report_content = Column(Text, nullable=True)
    file_url = Column(String, nullable=True)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())

    # relationships
    event = relationship("Event", back_populates="report")


class EventRSVP(Base):
    __tablename__ = "event_rsvp"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    event_id = Column(String, ForeignKey("events.id"), nullable=False)
    student_id = Column(String, ForeignKey("students.id"), nullable=False)
    rsvped_at = Column(DateTime(timezone=True), server_default=func.now())
    # no status field — rsvp is permanent once made
    # unique constraint on (event_id, student_id) enforced below

    # relationships
    event = relationship("Event", back_populates="rsvps")
    student = relationship("Student", back_populates="rsvps")

    from sqlalchemy import UniqueConstraint
    __table_args__ = (
        UniqueConstraint("event_id", "student_id", name="uq_rsvp_event_student"),
    )