from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from database import get_db
import models
from security import verify_password
from auth import create_access_token

router = APIRouter(
    tags=["Login"]
)

@router.post("/login")
def login(
    credentials: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # Try student first
    user = db.query(models.Student).filter(
        models.Student.email == credentials.username
    ).first()
    role = "student"
    user_id = user.student_id if user else None

    # If not a student, try teacher
    if not user:
        user = db.query(models.Teacher).filter(
            models.Teacher.email == credentials.username
        ).first()
        role = "teacher"
        user_id = user.teacher_id if user else None

    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token = create_access_token(
        data={"sub": str(user_id), "role": role}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": role
    }