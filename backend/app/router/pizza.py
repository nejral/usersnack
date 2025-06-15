from typing import List

from fastapi import APIRouter, Depends

from app.schemas.pizza import Pizza, Extra
from app.service.pizza_service import get_pizza_service

router = APIRouter()


@router.get("/pizza/all", response_model=List[Pizza])
async def get_pizzas(service = Depends(get_pizza_service)):
    return await service.get_all_pizzas()

@router.get("/extra/all", response_model=list[Extra])
async def get_extras(service = Depends(get_pizza_service)):
    return await service.get_all_extras()
