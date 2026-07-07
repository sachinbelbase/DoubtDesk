from sqlalchemy import Column, Integer, String, Text, ForeignKey, TIMESTAMP,DateTime
from database import Base


class Student(Base):
    __tablename__ = "students"

    student_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    class_id = Column(Integer, ForeignKey("classes.class_id"))
    created_at = Column(DateTime)


class Question(Base):
    __tablename__ = "questions"

    question_id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.student_id"))
    class_id = Column(Integer, ForeignKey("classes.class_id"))
    title = Column(String(255), nullable=False)
    question_text = Column(Text, nullable=False)
    visibility = Column(String(20))
    status = Column(String(20))
    created_at = Column(DateTime)


class Answer(Base):
    __tablename__ = "answers"

    answer_id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("questions.question_id"))
    student_id = Column(Integer, ForeignKey("students.student_id"))
    teacher_id = Column(Integer, ForeignKey("teachers.teacher_id"))
    created_at = Column(DateTime)
    answer_text = Column(Text)

class Class(Base):
    __tablename__ = "classes"

    class_id = Column(Integer, primary_key=True, index=True)
    program = Column(String(100), nullable=False)
    semester = Column(Integer, nullable=False)
    section = Column(String(10), nullable=False)
    created_at = Column(DateTime)

class Teacher(Base):
    __tablename__ = "teachers"

    teacher_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    department = Column(String(100))
    created_at = Column(DateTime)

class TeacherClass(Base):
    __tablename__ = "teacher_classes"

    teacher_id = Column(
        Integer,
        ForeignKey("teachers.teacher_id"),
        primary_key=True
    )

    class_id = Column(
        Integer,
        ForeignKey("classes.class_id"),
        primary_key=True
    )