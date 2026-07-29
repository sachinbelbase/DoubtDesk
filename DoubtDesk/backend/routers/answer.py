from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from auth import get_current_user, get_current_teacher

import schemas
import models

router = APIRouter(
    prefix="/answers",
    tags=["Answers"]
)

@router.post("/")
def answer_question(
    answer: schemas.CreateAnswer,
    current_teacher: models.Teacher = Depends(get_current_teacher),
    db: Session = Depends(get_db)
):
    question = db.query(models.Question).filter(models.Question.question_id == answer.question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    new_answer = models.Answer(
        question_id=answer.question_id,
        teacher_id=current_teacher.teacher_id,
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
    current=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user, role = current

    question = db.query(models.Question).filter(models.Question.question_id == question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    # Teachers can view answers to any question
    if role != "teacher":
        # Students can only view answers to questions they're allowed to see
        is_college_wide = question.visibility == "COLLEGE"
        is_own_class = question.visibility == "CLASS" and question.class_id == user.class_id

        if not (is_college_wide or is_own_class):
            raise HTTPException(status_code=403, detail="You don't have access to this question")

    answers = db.query(models.Answer).filter(models.Answer.question_id == question_id).all()

    result = [
        schemas.AnswerResponse(
            answer_id=answer.answer_id,
            question_text=question.question_text,
            answer_text=answer.answer_text,
            created_at=answer.created_at
        )
        for answer in answers
    ]
    return result