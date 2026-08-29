import httpx
from fastapi import APIRouter, HTTPException, Depends

from auth import get_current_user
from database import User

router = APIRouter(prefix="/github", tags=["Github"])

@router.get('/search/{username}')
async def search_github_user(username: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://api.github.com/users/{username}")

        if response.status_code == 404:
            raise HTTPException(status_code=404, detail="Github user not found")
        
        return response.json()

@router.get('/users')
async def get_users(since: int = 0, current_user: User = Depends(get_current_user)):

    token = current_user.github_access_token

    async with httpx.AsyncClient() as client:

        response = await client.get(f"https://api.github.com/users?since={since}",
        headers={
            "Authorization": f"Bearer {token}", "Accept": "application/vnd.github.v3+json"
        })

        if response.status_code != 200:
            raise HTTPException(status_code=404, detail="Unable to get github users")
        
        return response.json()
