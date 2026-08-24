from fastapi import FastAPI

from routers import products, users

app = FastAPI()

@app.get('/')
def home():
    return {"message": "Hellow World!!!"}

app.include_router(users.router)

app.include_router(products.router)