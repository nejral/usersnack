from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.extra import Extra
from app.models.pizza import Pizza


class PizzaRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all_pizzas(self):
        result = await self.db.execute(select(Pizza))
        return result.scalars().all()

    async def get_all_extras(self):
        result = await self.db.execute(select(Extra))
        return result.scalars().all()
