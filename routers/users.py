from sqlmodel import Session, SQLModel, select
from fastapi import APIRouter, HTTPException

from database import User, engine

router = APIRouter(prefix="/users", tags=["Users"])


class UserUpdate(SQLModel):
    username: str = None
    email: str = None


@router.post('', status_code=201)
def create_user(user: User):
    with Session(engine) as session:
        session.add(user)
        session.commit()
        session.refresh(user)

    return user

@router.get('')
def get_all_users():
    with Session(engine) as session:
        users = session.exec(select(User)).all()
        return users
    
@router.get('/{user_id}')
def get_user(user_id: int):
    with Session(engine) as session:
        user = session.get(User, user_id)

        if not user:
                raise HTTPException(status_code=404, detail="User not found")

        return user

@router.delete('/{user_id}')
def delete_user(user_id: int):
    with Session(engine) as session:

        user = session.get(User, user_id)

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        session.delete(user)
        session.commit()

    return {"message": "User deleted"}

@router.patch('/{user_id}')
def update_user(user_id: int, user_update: UserUpdate):

    with Session(engine) as session:
        user = session.get(User, user_id)

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        if user_update.username is not None:
            user.username = user_update.username
        if user_update.email is not None:
            user.email = user_update.email

        session.commit()
        session.refresh(user)

        return user
    
        
     