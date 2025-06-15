from pydantic import BaseModel
from typing import List

class Extra(BaseModel):
    name: str
    price: float

class Pizza(BaseModel):
    id: int
    name: str
    price: float
    ingredients: List[str]
    img: str
