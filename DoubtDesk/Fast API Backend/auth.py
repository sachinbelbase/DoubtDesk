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

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login", scheme_name="Auth")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        print("=" * 50)
        print("TOKEN:", token)

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print("PAYLOAD:", payload)

        user_id = payload.get("sub")
        role = payload.get("role")

        print("USER ID:", user_id)
        print("ROLE:", role)

        if role == "student":
            user = db.query(models.Student).filter(
                models.Student.student_id == int(user_id)
            ).first()
            print("FOUND STUDENT:", user)

        elif role == "teacher":
            user = db.query(models.Teacher).filter(
                models.Teacher.teacher_id == int(user_id)
            ).first()
            print("FOUND TEACHER:", user)

        else:
            print("INVALID ROLE")
            raise credentials_exception

    except Exception as e:
        print("ERROR:", e)
        raise credentials_exception

    if user is None:
        print("USER IS NONE")
        raise credentials_exception

    return user, role

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print("TOKEN PAYLOAD:", payload)
        user_id = payload.get("sub")
        role = payload.get("role")

        print("USER ID:", user_id)
        print("ROLE:", role)

        if user_id is None or role is None:
            raise credentials_exception

        if role == "student":
            user = db.query(models.Student).filter(
                models.Student.student_id == int(user_id)
            ).first()
            
            print("FOUND STUDENT:", user)
        elif role == "teacher":
            user = db.query(models.Teacher).filter(
                models.Teacher.teacher_id == int(user_id)
            ).first()
            
            print("FOUND TEACHER:", user)
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