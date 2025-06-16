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
            status=order_in.status,
            customer_name=order_in.customer_name,
            customer_email=order_in.customer_email,
        )
        self.db.add(order)
        await self.db.commit()
        await self.db.refresh(order)

    async def get_all_orders(self):
        result = await self.db.execute(select(Order))
        return result.scalars().all()
