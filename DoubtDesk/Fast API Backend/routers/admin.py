from fastapi import APIRouter, Depends, HTTPException
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
        is_active=student.is_active,
        created_at=student.created_at,
    )
)

    return result



@router.get("/teachers", response_model=list[schemas.AdminTeacherOut])
def get_all_teachers(
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    teachers = (
        db.query(models.Teacher)
        .order_by(models.Teacher.created_at.desc())
        .all()
    )

    result = []

    for teacher in teachers:

        result.append(
            schemas.AdminTeacherOut(
                teacher_id=teacher.teacher_id,
                name=teacher.name,
                email=teacher.email,
                department=teacher.department or "Not Assigned",
                is_active=teacher.is_active,
                created_at=teacher.created_at,
            )
        )

    return result



@router.get("/questions", response_model=list[schemas.AdminQuestionOut])
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

    for question in questions:

        student = (
            db.query(models.Student)
            .filter(models.Student.student_id == question.student_id)
            .first()
        )

        student_class = (
            db.query(models.Class)
            .filter(models.Class.class_id == question.class_id)
            .first()
        )

        answer = (
            db.query(models.Answer)
            .filter(models.Answer.question_id == question.question_id)
            .first()
        )

        teacher_name = None

        if answer:
            teacher = (
                db.query(models.Teacher)
                .filter(models.Teacher.teacher_id == answer.teacher_id)
                .first()
            )

            if teacher:
                teacher_name = teacher.name

        class_name = "N/A"

        if student_class:
            class_name = (
                f"{student_class.program} "
                f"Semester {student_class.semester} "
                f"Section {student_class.section}"
            )

        result.append(
            schemas.AdminQuestionOut(
                question_id=question.question_id,
                title=question.title,
                student_name=student.name if student else "Unknown",
                class_name=class_name,
                visibility=question.visibility,
                status=question.status,
                teacher_name=teacher_name,
                created_at=question.created_at,
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
            detail="Question not found"
        )

    db.query(models.Answer).filter(
        models.Answer.question_id == question_id
    ).delete()

    db.delete(question)

    db.commit()

    return {
        "message": "Question deleted successfully."
    }

@router.patch("/students/{student_id}/block")
def block_student(
    student_id: int,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    student = (
        db.query(models.Student)
        .filter(models.Student.student_id == student_id)
        .first()
    )

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    student.is_active = False

    db.commit()
    db.refresh(student)

    return {
        "message": "Student blocked successfully"
    }

@router.patch("/students/{student_id}/unblock")
def unblock_student(
    student_id: int,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    student = (
        db.query(models.Student)
        .filter(models.Student.student_id == student_id)
        .first()
    )

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    student.is_active = True

    db.commit()
    db.refresh(student)

    return {
        "message": "Student unblocked successfully"
    }

@router.patch("/teachers/{teacher_id}/block")
def block_teacher(
    teacher_id: int,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    teacher = (
        db.query(models.Teacher)
        .filter(models.Teacher.teacher_id == teacher_id)
        .first()
    )

    if not teacher:
        raise HTTPException(
            status_code=404,
            detail="Teacher not found"
        )

    teacher.is_active = False

    db.commit()
    db.refresh(teacher)

    return {
        "message": "Teacher blocked successfully"
    }
    
    
@router.patch("/teachers/{teacher_id}/unblock")
def unblock_teacher(
    teacher_id: int,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    teacher = (
        db.query(models.Teacher)
        .filter(models.Teacher.teacher_id == teacher_id)
        .first()
    )

    if not teacher:
        raise HTTPException(
            status_code=404,
            detail="Teacher not found"
        )

    teacher.is_active = True

    db.commit()
    db.refresh(teacher)

    return {
        "message": "Teacher unblocked successfully"
    }