from sqlalchemy import Column, Integer, String, Text, ForeignKey, TIMESTAMP
from database import Base


class Student(Base):
    __tablename__ = "students"

    student_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(150), unique=True)
    password_hash = Column(String(255))


class Question(Base):
    __tablename__ = "questions"

    question_id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.student_id"))
    title = Column(String(255))
    description = Column(Text)
    status = Column(String(20))


class Answer(Base):
    __tablename__ = "answers"

    answer_id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("questions.question_id"))
    student_id = Column(Integer, ForeignKey("students.student_id"))
    answer_text = Column(Text)