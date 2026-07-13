from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from auth import create_access_token
from database import get_db
from security import hash_password, verify_password
import models
import schemas

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)


@router.post("/register")
def register_student(
    student: schemas.CreateStudent,
    db: Session = Depends(get_db)
):
    # Validate email
    if not student.email.endswith("@ncit.edu.np"):
        raise HTTPException(
            status_code=400,
            detail="Only NCIT email addresses are allowed."
        )

    # Validate password
    if len(student.password) < 8:
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 8 characters long."
        )

    # Check if email already exists
    existing_student = db.query(models.Student).filter(
        models.Student.email == student.email
    ).first()

    if existing_student:
        raise HTTPException(
            status_code=400,
            detail="Email already registered."
        )

    # Find existing class
    existing_class = db.query(models.Class).filter(
        models.Class.program == student.program,
        models.Class.semester == student.semester,
        models.Class.section == student.section
    ).first()

    # Create class if it doesn't exist
    if not existing_class:
        existing_class = models.Class(
            program=student.program,
            semester=student.semester,
            section=student.section
        )

        db.add(existing_class)
        db.commit()
        db.refresh(existing_class)

    # Create student
    new_student = models.Student(
        name=student.name,
        email=student.email,
        password_hash=hash_password(student.password),
        class_id=existing_class.class_id
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return {
        "message": f"{new_student.name} has been registered successfully.",
        "class_id": new_student.class_id,
        "student_id": new_student.student_id,
        "name": new_student.name,
        "email": new_student.email
    }


@router.post("/login")
def login_student(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # Find student
    db_student = db.query(models.Student).filter(
        models.Student.email == form_data.username
    ).first()

    # Verify credentials
    if not db_student or not verify_password(
        form_data.password,
        db_student.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    # Generate JWT
    access_token = create_access_token(
        data={"sub": str(db_student.student_id)}
    )

    return {
        "message": f"{db_student.name} has logged in successfully.",
        "student_id": db_student.student_id,
        "access_token": access_token,
        "class_id": db_student.class_id,
        "token_type": "bearer",
        "name": db_student.name,
        "email": db_student.email
    }