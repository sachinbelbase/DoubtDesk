from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from typing import List

from database import get_db
from auth import get_current_teacher, get_current_user, get_current_student
import schemas
import models
from sqlalchemy import func

router = APIRouter(
    prefix="/questions",
    tags=["Questions"]
)

@router.get("/", response_model=schemas.PaginatedQuestions)
def get_questions(
    page: int = 1,
    limit: int = 20,
    search: str = None,
    sort: schemas.SortOption = schemas.SortOption.newest,
    status_filter: schemas.StatusFilterOption = None,
    current=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user, role = current

    if page < 1:
        raise HTTPException(status_code=400, detail="Page must be 1 or greater")
    if limit < 1 or limit > 100:
        raise HTTPException(status_code=400, detail="Limit must be between 1 and 100")

    if role == "teacher":
        query = db.query(models.Question)
    else:
        query = db.query(models.Question).filter(
            or_(
                models.Question.visibility == "COLLEGE",
                and_(
                    models.Question.visibility == "CLASS",
                    models.Question.class_id == user.class_id
                )
            )
        )

    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            or_(
                models.Question.title.ilike(search_pattern),
                models.Question.question_text.ilike(search_pattern)
            )
        )
    print("status_filter:", status_filter)
    print("type:", type(status_filter))
    if status_filter == schemas.StatusFilterOption.answered:
        
        query = query.filter(models.Question.status == "ANSWERED")
    elif status_filter == schemas.StatusFilterOption.unanswered:
        query = query.filter(models.Question.status == "OPEN")
        
    print("Questions found:", query.count())

    if sort == schemas.SortOption.oldest:
        query = query.order_by(models.Question.created_at.asc())

    elif sort == schemas.SortOption.most_answered:
        query = (
            query
            .outerjoin(
                models.Answer,
                models.Question.question_id == models.Answer.question_id
            )
            .group_by(models.Question.question_id)
            .order_by(func.count(models.Answer.answer_id).desc())
        )

    else:
        query = query.order_by(models.Question.created_at.desc())
        
    
    total = query.count()

    offset = (page - 1) * limit
    questions = query.offset(offset).limit(limit).all()

    result = []
    for q in questions:
        if role == "student" and q.student_id == user.student_id:
            asked_by = "You"
        else:
            asked_by = "Anonymous"

        result.append(schemas.QuestionOut(
            question_id=q.question_id,
            class_id=q.class_id,
            title=q.title,
            question_text=q.question_text,
            visibility=q.visibility,
            status=q.status,
            created_at=q.created_at,
            asked_by=asked_by
        ))

    return {
    "items": result,
    "page": page,
    "limit": limit,
    "total": total,
    "total_pages": (total + limit - 1) // limit,
}


@router.post("/")
def ask_question(
    question: schemas.CreateQuestion,
    current=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user, role = current

    if role != "student":
        raise HTTPException(status_code=403, detail="Only students can ask questions")

    new_question = models.Question(
        student_id=user.student_id,
        title=question.title,
        question_text=question.question_text,
        visibility=question.visibility,
        class_id=user.class_id,
        status="OPEN"
    )

    db.add(new_question)
    db.commit()
    db.refresh(new_question)

    return {
        "message": f"Question '{new_question.title}' has been asked successfully",
        "question_id": new_question.question_id
    }


@router.get("/me", response_model=List[schemas.QuestionOut])
def get_my_questions(
    sort: schemas.SortOption = schemas.SortOption.newest,
    current_student: models.Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    query = db.query(models.Question).filter(
    models.Question.student_id == current_student.student_id
)

    if sort == schemas.SortOption.oldest:
        query = query.order_by(models.Question.created_at.asc())

    elif sort == schemas.SortOption.most_answered:
        query = (
            query
            .outerjoin(
                models.Answer,
                models.Question.question_id == models.Answer.question_id
            )
            .group_by(models.Question.question_id)
            .order_by(func.count(models.Answer.answer_id).desc())
        )

    else:
        query = query.order_by(models.Question.created_at.desc())

    questions = query.all()

    result = []

    for q in questions:
        result.append(
            schemas.QuestionOut(
                question_id=q.question_id,
                class_id=q.class_id,
                title=q.title,
                question_text=q.question_text,
                visibility=q.visibility,
                status=q.status,
                created_at=q.created_at,
                asked_by="You",
            )
        )

    return result

@router.put("/{question_id}")
def update_question(
    question_id: int,
    updated_question: schemas.CreateQuestion,
    current_student: models.Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    question = db.query(models.Question).filter(
        models.Question.question_id == question_id
    ).first()

    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    if question.student_id != current_student.student_id:
        raise HTTPException(status_code=403, detail="You can only edit your own questions")

    question.title = updated_question.title
    question.question_text = updated_question.question_text
    question.visibility = updated_question.visibility

    db.commit()
    db.refresh(question)

    return {
        "message": f"Question '{question.title}' has been updated successfully",
        "question_id": question.question_id
    }


@router.delete("/{question_id}")
def delete_question(
    question_id: int,
    current_student: models.Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    question = db.query(models.Question).filter(
        models.Question.question_id == question_id
    ).first()

    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    if question.student_id != current_student.student_id:
        raise HTTPException(status_code=403, detail="You can only delete your own questions")

    db.delete(question)
    db.commit()

    return {"message": f"Question '{question.title}' has been deleted successfully"}


@router.put("/{question_id}/status")
def update_question_status(
    question_id: int,
    status_update: schemas.UpdateQuestionStatus,
    current_student: models.Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    question = db.query(models.Question).filter(
        models.Question.question_id == question_id
    ).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    if question.student_id != current_student.student_id:
        raise HTTPException(status_code=403, detail="You can only update the status of your own questions")

    question.status = status_update.status
    db.commit()
    db.refresh(question)

    return {
        "message": f"Question ID '{question.question_id}' status has been updated to '{question.status}'"
    }
    
@router.get("/{question_id}", response_model=schemas.QuestionOut)
def get_question(
    question_id: int,
    current=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user, role = current

    question = db.query(models.Question).filter(
        models.Question.question_id == question_id
    ).first()

    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    if role == "student":
        if (
            question.visibility == "CLASS"
            and question.class_id != user.class_id
        ):
            raise HTTPException(
                status_code=403,
                detail="Not allowed"
            )

    asked_by = (
        "You"
        if role == "student"
        and question.student_id == user.student_id
        else "Anonymous"
    )

    return schemas.QuestionOut(
        question_id=question.question_id,
        class_id=question.class_id,
        title=question.title,
        question_text=question.question_text,
        visibility=question.visibility,
        status=question.status,
        created_at=question.created_at,
        asked_by=asked_by,
    )
    

@router.get(
    "/{question_id}/answers",
    response_model=List[schemas.AnswerOut]
)
def get_question_answers(
    question_id: int,
    current=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    answers = (
        db.query(models.Answer)
        .filter(models.Answer.question_id == question_id)
        .order_by(models.Answer.created_at.asc())
        .all()
    )

    result = []

    for answer in answers:
        teacher = (
            db.query(models.Teacher)
            .filter(models.Teacher.teacher_id == answer.teacher_id)
            .first()
        )

        result.append(
            schemas.AnswerOut(
                answer_id=answer.answer_id,
                question_id=answer.question_id,
                teacher_id=answer.teacher_id,
                answer_text=answer.answer_text,
                created_at=answer.created_at,
                teacher_name=teacher.name if teacher else "Unknown",
            )
        )

    return result
