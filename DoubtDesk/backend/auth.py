import os
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from dotenv import load_dotenv

from database import get_db
import models

load_dotenv()

# Single shared OAuth2 scheme — one Authorize lock in Swagger
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login", scheme_name="Auth")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        role = payload.get("role")

        if user_id is None or role is None:
            raise credentials_exception

        if role == "student":
            user = db.query(models.Student).filter(
                models.Student.student_id == int(user_id)
            ).first()
        elif role == "teacher":
            user = db.query(models.Teacher).filter(
                models.Teacher.teacher_id == int(user_id)
            ).first()
        else:
            raise credentials_exception

    except (JWTError, ValueError):
        raise credentials_exception

    if user is None:
        raise credentials_exception

    return user, role


def get_current_student(current=Depends(get_current_user)):
    user, role = current
    if role != "student":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Students only"
        )
    return user


def get_current_teacher(current=Depends(get_current_user)):
    user, role = current
    if role != "teacher":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Teachers only"
        )
    return user