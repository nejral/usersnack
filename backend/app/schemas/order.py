import uuid
from enum import Enum
from typing import List

from pydantic import BaseModel


class StatusEnum(str, Enum):
    pending = "pending"
    active = "active"
    declined = "declined"

class OrderItem(BaseModel):
    pizza_id: int
    extras: List[int] = []
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItem]
    customer_name: str
    customer_email: str
    price: float
    status: StatusEnum = StatusEnum.pending

class OrderResponse(BaseModel):
    id: uuid.UUID
    customer_name: str
    customer_email: str
    items: List[OrderItem]
    price: float
    status: StatusEnum

    class Config:
        orm_mode = True
