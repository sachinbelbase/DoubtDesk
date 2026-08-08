from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import models
import schemas

from database import get_db
from auth import get_current_user

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


def _resolve_user_id(user, role: str) -> int:
    """Map the current (user, role) pair to the id used on Notification.user_id.

    Handles all three roles explicitly instead of assuming every user object
    has a .teacher_id — the admin identity doesn't, and previously crashed
    this endpoint with a 500 error.
    """
    if role == "student":
        return user.student_id
    if role == "teacher":
        return user.teacher_id
    if role == "admin":
        return user.admin_id
    raise HTTPException(status_code=400, detail="Unknown role")


@router.get("/", response_model=list[schemas.NotificationOut])
def get_notifications(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user, role = current_user

    user_id = _resolve_user_id(user, role)

    notifications = (
        db.query(models.Notification)
        .filter(
            models.Notification.user_id == user_id,
            models.Notification.role == role
        )
        .order_by(models.Notification.created_at.desc())
        .all()
    )

    return notifications


@router.put("/{notification_id}/read")
def mark_as_read(
    notification_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user, role = current_user

    user_id = _resolve_user_id(user, role)

    notification = (
        db.query(models.Notification)
        .filter(
            models.Notification.notification_id == notification_id,
            models.Notification.user_id == user_id,
            models.Notification.role == role
        )
        .first()
    )

    if not notification:
        raise HTTPException(
            status_code=404,
            detail="Notification not found."
        )

    notification.is_read = True

    db.commit()

    return {
        "message": "Notification marked as read."
    }