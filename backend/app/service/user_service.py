from app.db.session import get_db
from app.repository.user_repository import UserRepository
from fastapi import Depends

class UserService:
    def __init__(self, repository: UserRepository):
        self.repository = repository

    async def get_user(self, id: int):
        user = await self.repository.get_user_by_id(id)
        if not user:
            return None
        return user

    async def login(self, email: str, password: str):
        return await self.repository.login(email=email, password=password)

def get_user_service(db = Depends(get_db)):
    user_repository = UserRepository(db)
    return UserService(repository=user_repository)
