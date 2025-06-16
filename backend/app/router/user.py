from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.schemas.user import LoginRequest
from app.service.user_service import get_user_service

router = APIRouter()

@router.get("/user/{id}")
async def get_user_by_email(id: int, service = Depends(get_user_service)):
    user = await service.get_user(id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/login")
async def login(data: LoginRequest, service = Depends(get_user_service)):
    return await service.login(email=data.email, password=data.password)
