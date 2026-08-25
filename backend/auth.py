import jwt
from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session
from database import engine, User

from config import settings


ALGORITHM = "HS256"

oauth_scheme = OAuth2PasswordBearer(tokenUrl="users/login")

def create_access_token(user_id: int):

    expire = datetime.now(timezone.utc) + timedelta(minutes=30)

    payload = {
        "sub": str(user_id),
        "exp": expire
    }

    encoded_jwt = jwt.encode(payload, key=settings.secret_key, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth_scheme)):
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[ALGORITHM])
        user_id = int(payload.get("sub"))
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    with Session(engine) as session:
        user = session.get(User, user_id)
        if not user:
            raise HTTPException(status_code=401, detail="User no longer exists")
        
        return user
        