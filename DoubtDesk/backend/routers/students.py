from fastapi import FastAPI,Depends,HTTPException,APIRouter
from sqlalchemy.orm import Session
from auth import create_access_token
from database import Base, engine , get_db
import models
import schemas
from security import hash_password, verify_password

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)

@router.post("/register")
def register_student(
    students: schemas.CreateStudent,
    db: Session = Depends(get_db)
):
    
    if not students.email.endswith("@ncit.edu.np") or len(students.password) < 8:
        raise HTTPException(status_code=400, detail="Email must be a valid NCIT email address "
        "and password must be at least 8 characters long")
    
    existing_student = db.query(models.Student).filter(models.Student.email == students.email).first()
    if existing_student:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    
    new_student = models.Student(
        name=students.name,
        email=students.email,
        password_hash= hash_password(students.password)
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return {
        "message": f"{new_student.name} has been registered successfully",
        "student_id": new_student.student_id,
        "name": new_student.name,
        "email": new_student.email
    }


@router.post("/login")
def login_student(
    students: schemas.LoginStudent,
    db: Session = Depends(get_db)
):
    # finds student with given email
    db_student = db.query(models.Student).filter(models.Student.email == students.email).first()

    # checks if student exists and verifies password
    if not db_student or not verify_password(students.password, db_student.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    #create jwt token
    access_token = create_access_token(
        data = {"sub": db_student.email}
    )

    return {
        "message": f"{db_student.name} has logged in successfully",
        "student_id": db_student.student_id,
        "access_token": access_token,
        "name": db_student.name,
        "email": db_student.email
    }
