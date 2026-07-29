from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from typing import List

from database import get_db
from auth import get_current_user, get_current_student
import schemas
import models

router = APIRouter(
    prefix="/questions",
    tags=["Questions"]
)

@router.get("/", response_model=List[schemas.QuestionOut])
def get_questions(
    current=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user, role = current

    if role == "teacher":
        # Teachers see every question, no restrictions
        questions = db.query(models.Question).all()
    else:
        # Students see their class's questions + all college-wide ones
        questions = db.query(models.Question).filter(
            or_(
                models.Question.visibility == "COLLEGE",
                and_(
                    models.Question.visibility == "CLASS",
                    models.Question.class_id == user.class_id
                )
            )
        ).all()

    return questions


@router.post("/")
def ask_question(
    question: schemas.CreateQuestion,
    current_student: models.Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    new_question = models.Question(
        student_id=current_student.student_id,
        title=question.title,
        question_text=question.question_text,
        visibility=question.visibility,
        class_id=current_student.class_id,
        status="OPEN"
    )

    db.add(new_question)
    db.commit()
    db.refresh(new_question)

    return {
        "message": f"Question '{new_question.title}' has been asked successfully",
        "question_id": new_question.question_id
    }