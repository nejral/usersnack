from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models.user import User


class UserRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_user_by_id(self, id: int):
        result = await self.db.execute(select(User).where(User.id == id))
        return result.scalar_one_or_none()

    async def login(self, email: str, password: str):
        user = await self.db.execute(select(User).where(User.email == email))
        user = user.scalar_one_or_none()
        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")

        if password != user.password:
            raise HTTPException(status_code=401, detail="Invalid email or password")

        return User(
            id=user.id,
            email=user.email,
            admin=user.admin,
            password=user.password
        )
