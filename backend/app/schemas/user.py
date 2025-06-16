from pydantic import BaseModel

class User(BaseModel):
    id: str
    email: str
    admin: bool

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    email: str
    password: str