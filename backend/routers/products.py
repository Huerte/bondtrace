from pydantic import BaseModel
from fastapi import APIRouter

router = APIRouter(prefix="/products", tags=["Products"])

class Product(BaseModel):
    name: str
    price: float

class ProductResponse(BaseModel):
    name: str
    price: float
    tax: float

@router.post('', response_model=ProductResponse, status_code=201)
def submit_prodoct(product: Product):
    return {"name": product.name, "price": product.price, "tax": product.price * 0.1}

