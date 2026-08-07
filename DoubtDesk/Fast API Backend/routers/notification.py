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


@router.get("/", response_model=list[schemas.NotificationOut])
def get_notifications(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user, role = current_user

    user_id = (
        user.student_id
        if role == "student"
        else user.teacher_id
    )

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

    user_id = (
        user.student_id
        if role == "student"
        else user.teacher_id
    )

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