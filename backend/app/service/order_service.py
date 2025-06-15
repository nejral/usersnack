from fastapi import Depends
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.session import get_db
from app.repository.order_repository import OrderRepository
from app.schemas.order import OrderCreate


class OrderService:
    def __init__(self, order_repo: OrderRepository):
        self.order_repo = order_repo

    async def submit_order(self, order_in: OrderCreate):
        await self.order_repo.submit_order(order_in)

def get_order_service(db: AsyncSession = Depends(get_db)):
    order_repo = OrderRepository(db)
    return OrderService(order_repo=order_repo)
