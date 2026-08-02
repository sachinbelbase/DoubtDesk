from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from security import hash_password, verify_password
import models
import schemas
from auth import get_current_student

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

    
@router.get("/me", response_model=schemas.StudentOut)
def get_my_profile(
    current_student: models.Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    student_class = db.query(models.Class).filter(
        models.Class.class_id == current_student.class_id
    ).first()

    return schemas.StudentOut(
        student_id=current_student.student_id,
        name=current_student.name,
        email=current_student.email,
        program=student_class.program,
        semester=student_class.semester,
        section=student_class.section,
        created_at=current_student.created_at
    )
