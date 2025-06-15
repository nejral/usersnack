import json
from typing import List

from pydantic import BaseModel, validator


class Extra(BaseModel):
    name: str
    price: float

class Pizza(BaseModel):
    id: int
    name: str
    price: float
    ingredients: List[str]
    img: str

    @validator('ingredients', pre=True)
    def parse_ingredients(cls, v):
        if isinstance(v, str):
            # parse JSON string to list
            return json.loads(v)
        return v

    class Config:
        from_attributes = True
