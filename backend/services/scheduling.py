"""
services/scheduling.py

Handles the ONLY automatic event status transition:
    scheduled -> ongoing

All other transitions are manual or side-effects handled elsewhere:
    ongoing   -> completed  : admin action, PATCH /admin/events/{id}/complete
    completed -> closed     : side effect of report upload, POST /admin/events/{id}/report
    *         -> cancelled  : admin action, PATCH /admin/events/{id}/cancel

This module runs a background job on a timer using APScheduler.
It creates its own DB session since it does not run inside a
normal FastAPI request (no Depends(get_db) available here).
"""

import logging
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy.orm import Session
from database import SessionLocal
from models.event import Event

logger = logging.getLogger(__name__)

# how often the scheduler checks for events to transition, in minutes
CHECK_INTERVAL_MINUTES = 5


def update_event_statuses() -> None:
    """
    Moves any 'scheduled' event to 'ongoing' once its start
    date and time have passed. Runs on its own DB session
    since it's not triggered by a request.

    NOTE: datetime.now() is intentionally naive (no timezone) to match
    how event_date and event_time are stored in the DB (also naive).
    If the app is ever deployed across timezones, both the storage and
    this comparison need to be made timezone-aware together.
    """
    db: Session = SessionLocal()
    try:
        now = datetime.now()
        scheduled_events = db.query(Event).filter(
            Event.status == "scheduled"
        ).all()

        transitioned_count = 0
        for event in scheduled_events:
            event_start = datetime.combine(event.event_date, event.event_time)
            if now >= event_start:
                event.status = "ongoing"
                transitioned_count += 1
                logger.info(
                    "[scheduling] Event '%s' (%s) moved scheduled -> ongoing",
                    event.title, event.id
                )

        if transitioned_count:
            db.commit()
            logger.info(
                "[scheduling] %d event(s) transitioned to ongoing",
                transitioned_count
            )
    except Exception as e:
        db.rollback()
        logger.error("[scheduling] Error while updating event statuses: %s", e)
    finally:
        db.close()


def start_scheduler() -> BackgroundScheduler:
    """
    Creates and starts the background scheduler.
    Called once from main.py on app startup.
    Returns the scheduler instance so the caller can shut it down cleanly
    on app shutdown — do not discard the return value.
    """
    scheduler = BackgroundScheduler()
    scheduler.add_job(
        update_event_statuses,
        trigger="interval",
        minutes=CHECK_INTERVAL_MINUTES,
        id="update_event_statuses_job",
        replace_existing=True,
    )
    scheduler.start()
    logger.info(
        "[scheduling] Scheduler started — checking every %d minutes",
        CHECK_INTERVAL_MINUTES
    )
    return scheduler
