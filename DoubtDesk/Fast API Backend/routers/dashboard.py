from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from auth import get_current_student,get_current_teacher
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

    return {
        "total_questions": total_questions,
        "answered_questions": answered_questions,
        "open_questions": open_questions
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