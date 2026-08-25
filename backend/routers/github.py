from urllib import response
import httpx
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/github", tags=["Github"])

@router.get('/search/{username}')
async def search_github_user(username: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://api.github.com/users/{username}")

        if response.status_code == 404:
            raise HTTPException(status_code=404, detail="Github user not found")
        
        return response.json()