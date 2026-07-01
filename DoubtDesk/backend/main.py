from fastapi import FastAPI,Depends,HTTPException
from sqlalchemy.orm import Session
from database import Base, engine , get_db
from security import hash_password, verify_password

import models
import schemas

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "Welcome to DoubtDesk!"}


@app.post("/register")
def register_student(
    students: schemas.createStudent,
    db: Session = Depends(get_db)
):
    
    if not students.email.endswith("@ncit.edu.np") or len(students.password) < 8:
        raise HTTPException(status_code=400, detail="Email must be a valid NCIT email address "
        "and password must be at least 8 characters long")

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

