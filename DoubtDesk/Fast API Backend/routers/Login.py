from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt

from database import get_db
import models
import schemas
from security import verify_password
from auth import create_access_token, create_refresh_token, SECRET_KEY, ALGORITHM, ADMIN_EMAIL, ADMIN_PASSWORD

router = APIRouter(
    tags=["Login"]
)

@router.post("/login")
def login(
    credentials: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    
    if (
    credentials.username == ADMIN_EMAIL
    and credentials.password == ADMIN_PASSWORD
):
        access_token = create_access_token(
            {
            "sub": "0",
            "role": "admin",
            }
    )

        refresh_token = create_refresh_token(
            {
                "sub": "0",
                "role": "admin",
            }
        )

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "role": "admin",
        }
    
    
    user = db.query(models.Student).filter(
        models.Student.email == credentials.username
    ).first()
    role = "student"
    user_id = user.student_id if user else None


    if not user:
        user = db.query(models.Teacher).filter(
            models.Teacher.email == credentials.username
        ).first()
        role = "teacher"
        user_id = user.teacher_id if user else None



    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
    )

    if not verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
    )

    if not user.is_active:
        raise HTTPException(
            status_code=403,
            detail="Your account has been blocked by the administrator."
    )

    access_token = create_access_token(data={"sub": str(user_id), "role": role})
    refresh_token = create_refresh_token(data={"sub": str(user_id), "role": role})


    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "role": role
    }


@router.post("/refresh")
def refresh_access_token(body: schemas.RefreshRequest):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Invalid or expired refresh token"
    )

    try:
        payload = jwt.decode(body.refresh_token, SECRET_KEY, algorithms=[ALGORITHM])

        if payload.get("type") != "refresh":
            raise credentials_exception

        user_id = payload.get("sub")
        role = payload.get("role")

        if user_id is None or role is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    new_access_token = create_access_token(data={"sub": user_id, "role": role})

    return {
        "access_token": new_access_token,
        "token_type": "bearer"
    }