"""
scheduling.py

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

from datetime import datetime, time
from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy.orm import Session

from database import SessionLocal
from models.event import Event

# how often the scheduler checks for events to transition, in minutes
CHECK_INTERVAL_MINUTES = 5


def update_event_statuses() -> None:
    """
    Moves any 'scheduled' event to 'ongoing' once its start
    date and time have passed. Runs on its own DB session
    since it's not triggered by a request.
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
                print(f"[scheduling] Event '{event.title}' ({event.id}) moved scheduled -> ongoing")

        if transitioned_count:
            db.commit()
            print(f"[scheduling] {transitioned_count} event(s) transitioned to ongoing")

    except Exception as e:
        db.rollback()
        print(f"[scheduling] Error while updating event statuses: {e}")

    finally:
        db.close()


def start_scheduler() -> BackgroundScheduler:
    """
    Creates and starts the background scheduler.
    Called once from main.py on app startup.
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
    print(f"[scheduling] Scheduler started — checking every {CHECK_INTERVAL_MINUTES} minutes")
    return scheduler