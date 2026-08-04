from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import models
import schemas

from database import get_db
from auth import get_current_admin

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)

@router.get("/students", response_model=list[schemas.AdminStudentOut])
def get_all_students(
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    students = (
        db.query(models.Student)
        .order_by(models.Student.created_at.desc())
        .all()
    )

    result = []

    for student in students:

        student_class = (
            db.query(models.Class)
            .filter(models.Class.class_id == student.class_id)
            .first()
        )

        result.append(
            schemas.AdminStudentOut(
                student_id=student.student_id,
                name=student.name,
                email=student.email,
                program=student_class.program if student_class else "N/A",
                semester=student_class.semester if student_class else 0,
                section=student_class.section if student_class else "N/A",
                created_at=student.created_at,
            )
        )

    return result



@router.get("/teachers", response_model=list[schemas.TeacherOut])
def get_all_teachers(
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    teachers = (
        db.query(models.Teacher)
        .order_by(models.Teacher.created_at.desc())
        .all()
    )

    return teachers



@router.get("/questions", response_model=list[schemas.QuestionOut])
def get_all_questions(
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    questions = (
        db.query(models.Question)
        .order_by(models.Question.created_at.desc())
        .all()
    )

    result = []

    for q in questions:

        student = (
            db.query(models.Student)
            .filter(models.Student.student_id == q.student_id)
            .first()
        )

        result.append(
            schemas.QuestionOut(
                question_id=q.question_id,
                class_id=q.class_id,
                title=q.title,
                question_text=q.question_text,
                visibility=q.visibility,
                status=q.status,
                created_at=q.created_at,
                asked_by=student.name if student else "Unknown",
            )
        )

    return result

@router.delete("/questions/{question_id}")
def delete_question(
    question_id: int,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    question = (
        db.query(models.Question)
        .filter(models.Question.question_id == question_id)
        .first()
    )

    if not question:
        raise HTTPException(
            status_code=404,
            detail="Question not found",
        )

    db.query(models.Answer).filter(
        models.Answer.question_id == question_id
    ).delete()

    db.delete(question)
    db.commit()

    return {"message": "Question deleted successfully"}

# @router.patch("/students/{student_id}/block")
# @router.patch("/students/{student_id}/unblock")
# @router.patch("/teachers/{teacher_id}/block")
# @router.patch("/teachers/{teacher_id}/unblock")