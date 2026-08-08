import os
from types import SimpleNamespace
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
if not SECRET_KEY:
    raise RuntimeError(
        "SECRET_KEY is not set. Add it to your .env file, e.g.\n"
        "SECRET_KEY=<run: python -c \"import secrets; print(secrets.token_hex(32))\">"
    )

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7

# Admin credentials now come from the environment, never from source.
# ADMIN_PASSWORD_HASH must be a bcrypt hash, generated once with:
#   python -c "from security import hash_password; print(hash_password('your-password'))"
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH")

if not ADMIN_EMAIL or not ADMIN_PASSWORD_HASH:
    raise RuntimeError(
        "ADMIN_EMAIL and ADMIN_PASSWORD_HASH must be set in .env. "
        "Generate a hash with security.hash_password(), never store the plain password."
    )


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
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        user_id = payload.get("sub")
        role = payload.get("role")

        if user_id is None or role is None:
            raise credentials_exception

        if role == "student":
            user = db.query(models.Student).filter(
                models.Student.student_id == int(user_id)
            ).first()
            if user is not None and not user.is_active:
                raise HTTPException(
                    status_code=403,
                    detail="Your account has been blocked by the administrator.",
                )

        elif role == "teacher":
            user = db.query(models.Teacher).filter(
                models.Teacher.teacher_id == int(user_id)
            ).first()
            if user is not None and not user.is_active:
                raise HTTPException(
                    status_code=403,
                    detail="Your account has been blocked by the administrator.",
                )

        elif role == "admin":
            # SimpleNamespace (not a dict) so admin exposes attributes just
            # like Student/Teacher, keeping downstream code consistent.
            user = SimpleNamespace(
                admin_id=0,
                student_id=None,
                teacher_id=None,
                name="Administrator",
                email=ADMIN_EMAIL,
                is_active=True,
            )

        else:
            raise credentials_exception

    except JWTError:
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

def get_current_admin(current=Depends(get_current_user)):
    user, role = current

    if role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return user