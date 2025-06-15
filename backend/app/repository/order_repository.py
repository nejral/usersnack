from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.order import Order
from app.schemas.order import OrderCreate


class OrderRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def submit_order(self, order_in: OrderCreate):
        order = Order(
            items=[item.dict() for item in order_in.items],
            price=order_in.price,
            status=order_in.status
        )
        self.db.add(order)
        await self.db.commit()
        await self.db.refresh(order)
