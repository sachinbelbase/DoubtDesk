from pydantic import BaseModel
from enum import Enum

class CreateStudent(BaseModel):
    name : str
    email : str
    password : str


class LoginStudent(BaseModel):
    email : str
    password : str

class visibility(str ,Enum):
    CLASS = "CLASS"
    COLLEGE = "COLLEGE"
    

class CreateQuestion(BaseModel):
    student_id : int
    title : str
    question_text : str
    visibility : visibility

class CreateAnswer(BaseModel):
    question_id : int
    answer_text : str

class Token(BaseModel):
    access_token: str
    token_type: str

