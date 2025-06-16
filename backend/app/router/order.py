from fastapi import APIRouter, Depends

from app.schemas.order import OrderCreate
from app.service.order_service import get_order_service

router = APIRouter()


@router.post("/order/submit", status_code=200)
async def submit_order(order_in: OrderCreate, service = Depends(get_order_service)):
   await service.submit_order(order_in=order_in)

@router.get("/order/all", status_code=200)
async def get_all_orders(service = Depends(get_order_service)):
   return await service.get_all_orders()
