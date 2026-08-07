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
    current=Depends(get_current_user),      # renamed — it's a tuple, not just a teacher
    db: Session = Depends(get_db)
):
    user, role = current                     # unpack the tuple into the actual user + their role

    question = db.query(models.Question).filter(
        models.Question.question_id == answer.question_id
    ).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    new_answer = models.Answer(
        question_id=answer.question_id,
        student_id=user.student_id if role == "student" else None,   # fill only if student
        teacher_id=user.teacher_id if role == "teacher" else None,   # fill only if teacher
        answer_text=answer.answer_text
    )
    
    # Change question status
    question.status = "ANSWERED"
    
    notification = models.Notification(
        user_id=question.student_id,
        role="student",
        question_id=question.question_id,
        message=f"Your question '{question.title}' has been answered."
    )

    db.add(notification)

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
            answered_by_role="Teacher" if answer.teacher_id else "Student",
            created_at=answer.created_at
        )
        for answer in answers
    ]
    return result

@router.put("/{answer_id}")
def update_answer(
    answer_id: int,
    updated_answer: schemas.CreateAnswer,
    current=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user, role = current

    answer = db.query(models.Answer).filter(models.Answer.answer_id == answer_id).first()
    if not answer:
        raise HTTPException(status_code=404, detail="Answer not found")

    # Only the original author (student or teacher) can update their answer
    if (role == "student" and answer.student_id != user.student_id) or \
       (role == "teacher" and answer.teacher_id != user.teacher_id):
        raise HTTPException(status_code=403, detail="You can only edit your own answers")

    answer.answer_text = updated_answer.answer_text
    db.commit()
    db.refresh(answer)

    return {
        "message": f"Answer ID '{answer.answer_id}' has been updated successfully"
    }


@router.delete("/{answer_id}")
def delete_answer(
    answer_id: int,
    current=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user, role = current

    answer = db.query(models.Answer).filter(models.Answer.answer_id == answer_id).first()
    if not answer:
        raise HTTPException(status_code=404, detail="Answer not found")

    # Only the original author (student or teacher) can delete their answer
    if (role == "student" and answer.student_id != user.student_id) or \
       (role == "teacher" and answer.teacher_id != user.teacher_id):
        raise HTTPException(status_code=403, detail="You can only delete your own answers")

    db.delete(answer)
    db.commit()

    return {
        "message" : f"Answer ID '{answer.answer_id}' has been deleted successfully"
    }
