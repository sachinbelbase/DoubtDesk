from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from auth import get_current_student

import schemas
import models

router = APIRouter(
    prefix="/answers",
    tags=["Answers"]
)

@router.post("/")
def answer_question(
    answer: schemas.CreateAnswer,
    current_student: models.Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    # Check if the question exists
    question = db.query(models.Question).filter(models.Question.question_id == answer.question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    # Create a new answer
    new_answer = models.Answer(
        question_id=answer.question_id,
        student_id=current_student.student_id,
        answer_text=answer.answer_text
    )

    db.add(new_answer)
    db.commit()
    db.refresh(new_answer)

    return {
        "message": f"Answer to question ID '{new_answer.question_id}' has been submitted successfully",
        "answer_id": new_answer.answer_id
    }

@router.get(
    "/{question_id}",
    response_model=list[schemas.AnswerResponse]
)
def get_answers(
    question_id: int,
    current_student: models.Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    # Check if the question exists
    question = db.query(models.Question).filter(models.Question.question_id == question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    # Fetch answers for the given question
    answers = db.query(models.Answer).filter(models.Answer.question_id == question_id).all()

    return answers

