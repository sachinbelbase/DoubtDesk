from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict
from enum import Enum

class CreateStudent(BaseModel):
    name: str
    email: str
    password: str
    program: str
    semester: int
    section: str


class LoginStudent(BaseModel):
    email : str
    password : str

class visibility(str ,Enum):
    CLASS = "CLASS"
    COLLEGE = "COLLEGE"
    

class CreateQuestion(BaseModel):
    title : str
    question_text : str
    visibility : visibility

class CreateAnswer(BaseModel):
    question_id : int
    answer_text : str

class AnswerResponse(BaseModel):
    answer_id: int
    question_text: str
    answer_text: str
    answered_by_role: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str

class TeacherLogin(BaseModel):
    email: str
    password: str

class CreateTeacher(BaseModel):
    name: str
    email: str
    password: str
    department: str

class QuestionOut(BaseModel):
    question_id: int
    class_id: int | None
    title: str
    question_text: str
    visibility: str
    status: str
    created_at: datetime
    asked_by: str

    model_config = ConfigDict(from_attributes=True)

class StudentOut(BaseModel):
    student_id: int
    name: str
    email: str
    program: str
    semester: int
    section: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TeacherOut(BaseModel):
    teacher_id: int
    name: str
    email: str
    department: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class PaginatedQuestions(BaseModel):
    items: list[QuestionOut]
    page: int
    limit: int
    total: int
    total_pages: int

class RefreshRequest(BaseModel):
    refresh_token: str

class SortOption(str, Enum):
    newest = "newest"
    oldest = "oldest"

class StatusFilterOption(str, Enum):
    answered = "answered"
    unanswered = "unanswered"

class QuestionStatus(str, Enum):
    OPEN = "OPEN"
    ANSWERED = "ANSWERED"
    CLOSED = "CLOSED"

class UpdateQuestionStatus(BaseModel):
    status: QuestionStatus