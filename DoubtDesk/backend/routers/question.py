from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from database import get_db
from auth import get_current_student
import schemas
import models


router = APIRouter(
    prefix="/questions",
    tags=["Questions"]
)

@router.get("/")
def get_questions(
    current_student: models.Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    
    questions = db.query(models.Question).filter(
        (models.Question.visibility == "COLLEGE") |
        ((models.Question.visibility == "CLASS") & (models.Question.class_id == current_student.class_id))
    ).all()

    return questions


@router.post("/")
def ask_question(
    question : schemas.CreateQuestion,
    current_student: models.Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    
    new_question = models.Question(
        student_id = current_student.student_id,
        title = question.title,
        question_text = question.question_text,
        visibility = question.visibility,
        class_id = current_student.class_id,
        status = "OPEN"
        )

    db.add(new_question)
    db.commit()
    db.refresh(new_question)

    return {
        "message": f"Question '{new_question.title}' has been asked successfully",  
        "question_id": new_question.question_id
    }
