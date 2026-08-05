from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from auth import get_current_student,get_current_teacher,get_current_admin
import models

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/student")
def student_dashboard(
    student=Depends(get_current_student),
    db: Session = Depends(get_db)
):

    total_questions = db.query(models.Question).filter(
        models.Question.student_id == student.student_id
    ).count()

    answered_questions = db.query(models.Question).filter(
        models.Question.student_id == student.student_id,
        models.Question.status == "ANSWERED"
    ).count()

    open_questions = db.query(models.Question).filter(
        models.Question.student_id == student.student_id,
        models.Question.status == "OPEN"
    ).count()

    class_questions = db.query(models.Question).filter(
        models.Question.visibility == "CLASS"
    ).count()

    return {
        "total_questions": total_questions,
        "answered_questions": answered_questions,
        "open_questions": open_questions,
        "class_questions": class_questions,
    }
    
@router.get("/teacher")
def teacher_dashboard(
    current=Depends(get_current_teacher),
    db: Session = Depends(get_db)
):
    total_questions = db.query(models.Question).count()

    answered_questions = db.query(models.Question).filter(
        models.Question.status == "ANSWERED"
    ).count()

    pending_questions = db.query(models.Question).filter(
        models.Question.status == "OPEN"
    ).count()

    return {
        "total_questions": total_questions,
        "answered_questions": answered_questions,
        "pending_questions": pending_questions
    }
    
    
@router.get("/admin")
def get_admin_dashboard(
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    total_students = db.query(models.Student).count()

    total_teachers = db.query(models.Teacher).count()

    total_questions = db.query(models.Question).count()

    answered_questions = (
        db.query(models.Question)
        .filter(models.Question.status == "ANSWERED")
        .count()
    )

    open_questions = (
        db.query(models.Question)
        .filter(models.Question.status == "OPEN")
        .count()
    )

    return {
        "total_students": total_students,
        "total_teachers": total_teachers,
        "total_questions": total_questions,
        "answered_questions": answered_questions,
        "open_questions": open_questions,
    }