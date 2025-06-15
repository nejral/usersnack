from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.repository.pizza_repository import PizzaRepository


class PizzaService:

    def __init__(self, pizza_repo: PizzaRepository):
        self.pizza_repo = pizza_repo

    async def get_all_pizzas(self):
        return await self.pizza_repo.get_all_pizzas()

    async def get_all_extras(self):
        return await self.pizza_repo.get_all_extras()

def get_pizza_service(db: AsyncSession = Depends(get_db)):
    pizza_repository = PizzaRepository(db)
    return PizzaService(pizza_repo=pizza_repository)
