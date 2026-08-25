from pydantic import Field, BaseModel
from sqlmodel import Session, SQLModel, select
from fastapi import APIRouter, HTTPException, Depends
from pydantic import EmailStr, EmailStr
from passlib.context import CryptContext
import httpx

from database import User, engine
from auth import create_access_token, get_current_user
from config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(prefix="/users", tags=["Users"])


class UserUpdate(SQLModel):
    username: str = None
    email: str = None

class UserCreate(SQLModel):
    username: str = Field(min_length=3, max_length=30)
    email: EmailStr
    password: str = Field(min_length=6)

class UserLogin(BaseModel):
    username: str
    password: str = Field(min_length=6)

class OAuthPayload(BaseModel):
    code: str


# @router.post('/login')
# def login(user_data: UserLogin):

#     with Session(engine) as session:

#         user = session.exec(select(User).where(User.username == user_data.username)).first()

#         if not user or not pwd_context.verify(user_data.password, user.password):
#             raise HTTPException(status_code=401, detail="Invalid credentials")

#         token = create_access_token(user.id)

#         return {'access_token': token, "token_type": "bearer"}


# @router.post('', status_code=201)
# def create_user(user: UserCreate):
#     user = User(
#         username=user.username,
#         email=user.email,
#         password=pwd_context.hash(user.password)
#     )
#     with Session(engine) as session:
#         session.add(user)
#         session.commit()
#         session.refresh(user)

#     return user

# @router.get('')
# def get_all_users(current_user: User = Depends(get_current_user)):
#     with Session(engine) as session:
#         users = session.exec(select(User)).all()
#         return users
    
# @router.get('/{user_id}')
# def get_user(user_id: int):
#     with Session(engine) as session:
#         user = session.get(User, user_id)

#         if not user:
#                 raise HTTPException(status_code=404, detail="User not found")

#         return user

# @router.delete('/{user_id}')
# def delete_user(user_id: int):
#     with Session(engine) as session:

#         user = session.get(User, user_id)

#         if not user:
#             raise HTTPException(status_code=404, detail="User not found")

#         session.delete(user)
#         session.commit()

#     return {"message": "User deleted"}

# @router.patch('/{user_id}')
# def update_user(user_id: int, user_update: UserUpdate):

#     with Session(engine) as session:
#         user = session.get(User, user_id)

#         if not user:
#             raise HTTPException(status_code=404, detail="User not found")

#         if user_update.username is not None:
#             user.username = user_update.username
#         if user_update.email is not None:
#             user.email = user_update.email

#         session.commit()
#         session.refresh(user)

#         return user
    
        
@router.post('/auth/github')
async def github_login(payload: OAuthPayload):

    async with httpx.AsyncClient() as client:

        token_response = await client.post(
            "https://github.com/login/oauth/access_token",
            data={
                "client_id": settings.github_client_id,
                "client_secret": settings.github_client_secret,
                "code": payload.code
            },
            headers={"Accept": "application/json"}
        )

        access_token = token_response.json().get("access_token")

        if not access_token:
            raise HTTPException(status_code=400, detail="Invalid Github Code")

        user_response = await client.get(
            "https://api.github.com/user",
            headers={"Authorization": f"Bearer {access_token}"}
        )
        github_user = user_response.json()

    # Saved fetched github Profile in my local db
    with Session(engine) as session:

        user = session.exec(select(User).where(User.github_id == github_user.get("id"))).first()

        # username: str
        # github_id: int
        # github_url: str
        # following: list["User"] 
        # followers: list["User"]

        if not user:
            user = User(
                username=github_user.get("login"),
                github_id=github_user.get("id"),
                avatar_url=github_user.get("avatar_url"),
                github_access_token=access_token
            )
            session.add(user)
        else:
            user.github_access_token=access_token
            session.add(user)

        session.commit()
        session.refresh(user)

    token = create_access_token(user.id)

    return {'access_token': token, 'token_type': 'bearer'}


@router.put('/{username}/follow')
async def follow_user(username: str, current_user: User = Depends(get_current_user)):
    
    token = current_user.github_access_token

    async with httpx.AsyncClient() as client:

        response = await client.put(
            f"https://api.github.com/user/following/{username}",
            headers={
                "Authorization": f"Bearer {token}",
                "Accept": "application/vnd.github.v3+json"
            }
        )        

        if response.status_code == 204:
            return {"message": f"Successfully followed {username} on GitHub!"}
        else:
            raise HTTPException(
                status_code=response.status_code, 
                detail="Failed to follow user on GitHub"
            )

@router.delete('/{username}/unfollow')
async def unfollow_user(username: str, current_user: User = Depends(get_current_user)):

    token = current_user.github_access_token

    async with httpx.AsyncClient() as client:

        response = await client.delete(
            f"https://api.github.com/user/following/{username}",
            headers={
                "Authorization": f"Bearer {token}",
                "Accept": "application/vnd.github.v3+json"
            }
        )

        if response.status_code == 204:
            return {"message": f"Successfully unfollowed {username} on GitHub!"}
        else:
            raise HTTPException(status_code=response.status_code, detail="Failed to unfollow user on Github")
        

