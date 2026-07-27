from datetime import datetime

from pydantic import BaseModel
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
    answer_text: str
    created_at: datetime

    class config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

