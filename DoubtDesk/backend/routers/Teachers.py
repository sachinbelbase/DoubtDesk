from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from auth import get_current_teacher
from database import get_db
from security import hash_password, verify_password
import models, schemas



router = APIRouter(
    prefix="/teachers",
    tags=["Teachers"]
)

@router.post("/register")
def register_teacher(
    teacher: schemas.CreateTeacher,
    db: Session = Depends(get_db)
):
    # Validate email
    if not teacher.email.endswith("@ncit.edu.np"):
        raise HTTPException(
            status_code=400,
            detail="Only NCIT email addresses are allowed."
        )

    # Validate password
    if len(teacher.password) < 8:
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 8 characters long."
        )

    # Check if email already exists
    existing_teacher = db.query(models.Teacher).filter(
        models.Teacher.email == teacher.email
    ).first()

    if existing_teacher:
        raise HTTPException(
            status_code=400,
            detail="Email already registered."
        )

    # Create new teacher
    new_teacher = models.Teacher(
        name=teacher.name,
        email=teacher.email,
        password_hash=hash_password(teacher.password),
        department=teacher.department
    )
    db.add(new_teacher)
    db.commit()
    db.refresh(new_teacher)

    return {"message": "Teacher registered successfully."}

@router.get("/me", response_model=schemas.TeacherOut)
def get_my_profile(
    current_teacher: models.Teacher = Depends(get_current_teacher)
):
    return current_teacher

