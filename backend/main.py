from routers import github
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import products, users

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def home():
    return {"message": "Hellow World!!!"}

app.include_router(users.router)

app.include_router(products.router)

app.include_router(github.router)


