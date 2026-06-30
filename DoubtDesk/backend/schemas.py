from pydantic import BaseModel

class createStudent(BaseModel):
    name : str
    email : str
    password : str
    