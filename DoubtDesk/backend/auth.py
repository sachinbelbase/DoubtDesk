from jose import JWTError, jwt
from datetime import datetime, timedelta , timezone 

secret_key = "doubtdesk_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update(
        {
            "exp": expire
        }
    )

    token = jwt.encode(to_encode, secret_key, algorithm=ALGORITHM)
    return token
