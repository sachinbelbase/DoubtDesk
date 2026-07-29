from datetime import datetime

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
    student_id: int
    class_id: int
    title: str
    question_text: str
    visibility: str
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

    