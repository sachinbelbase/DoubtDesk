from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from database import get_db
import schemas
import models


router = APIRouter(
    prefix="/questions",
    tags=["Questions"]
)

@router.post("/")
def ask_question(
    question : schemas.CreateQuestion,
    db: Session = Depends(get_db)
):
    
    student = db.query(models.Student).filter(models.Student.student_id == question.student_id).first()
    if not student:
        raise HTTPException(status_code=400, detail="Student not found")
    
    new_question = models.Question(
        student_id = student.student_id,
        title = question.title,
        question_text = question.question_text,
        visibility = question.visibility,
        class_id = student.class_id,
        status = "OPEN"
        )

    db.add(new_question)
    db.commit()
    db.refresh(new_question)

    return {
        "message": f"Question '{new_question.title}' has been asked successfully",  
        "question_id": new_question.question_id
    }
