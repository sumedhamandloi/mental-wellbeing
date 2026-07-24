"""
tests/test_scheduling.py

Tests the event status transition logic in isolation.
Uses an in-memory SQLite database so it never touches your real wellbeing.db.
"""

import uuid
from datetime import date, time, timedelta, datetime

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database import Base
from models.event import Event
from models.admin import Admin
from services.scheduling import update_event_statuses


@pytest.fixture
def test_db(monkeypatch):
    """Creates a fresh in-memory DB for each test and points
    scheduling.py's SessionLocal at it."""
    engine = create_engine("sqlite:///:memory:", connect_args={"check_same_thread": False})
    TestSessionLocal = sessionmaker(bind=engine)
    Base.metadata.create_all(bind=engine)

    # patch scheduling.py's SessionLocal to use our test DB
    import services.scheduling as scheduling
    monkeypatch.setattr(scheduling, "SessionLocal", TestSessionLocal)

    db = TestSessionLocal()
    yield db
    db.close()


def make_admin(db):
    admin = Admin(
        id=str(uuid.uuid4()),
        name="Test Admin",
        email=f"{uuid.uuid4()}@test.com",
        password_hash="fakehash",
    )
    db.add(admin)
    db.commit()
    return admin


def make_event(db, admin_id, event_date, event_time, status="scheduled"):
    event = Event(
        id=str(uuid.uuid4()),
        admin_id=admin_id,
        title="Test Event",
        venue="Test Venue",
        event_date=event_date,
        event_time=event_time,
        status=status,
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


def test_past_event_transitions_to_ongoing(test_db):
    """An event scheduled in the past should flip to ongoing."""
    admin = make_admin(test_db)
    yesterday = date.today() - timedelta(days=1)
    event = make_event(test_db, admin.id, yesterday, time(14, 0), status="scheduled")

    update_event_statuses()
    test_db.refresh(event)

    assert event.status == "ongoing"


def test_future_event_stays_scheduled(test_db):
    """An event scheduled in the future should NOT transition yet."""
    admin = make_admin(test_db)
    tomorrow = date.today() + timedelta(days=1)
    event = make_event(test_db, admin.id, tomorrow, time(14, 0), status="scheduled")

    update_event_statuses()
    test_db.refresh(event)

    assert event.status == "scheduled"


def test_ongoing_event_is_not_touched(test_db):
    """An already-ongoing event should be left alone —
    scheduling.py must never move ongoing -> completed."""
    admin = make_admin(test_db)
    yesterday = date.today() - timedelta(days=1)
    event = make_event(test_db, admin.id, yesterday, time(14, 0), status="ongoing")

    update_event_statuses()
    test_db.refresh(event)

    assert event.status == "ongoing"  # unchanged


def test_completed_event_is_not_touched(test_db):
    """Completed events should never be reverted or altered."""
    admin = make_admin(test_db)
    yesterday = date.today() - timedelta(days=1)
    event = make_event(test_db, admin.id, yesterday, time(14, 0), status="completed")

    update_event_statuses()
    test_db.refresh(event)

    assert event.status == "completed"  # unchanged


def test_event_starting_just_now_transitions(test_db):
    """Edge case: event that started a moment ago should transition.
    Uses 1 second in the past instead of exactly now to avoid
    timing-sensitivity (commit latency could make 'now' flip sides)."""
    admin = make_admin(test_db)
    just_past = datetime.now() - timedelta(seconds=1)
    event = make_event(test_db, admin.id, just_past.date(), just_past.time(), status="scheduled")

    update_event_statuses()
    test_db.refresh(event)

    assert event.status == "ongoing"
