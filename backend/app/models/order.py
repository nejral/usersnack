import uuid
from enum import Enum as PyEnum
from typing import List

from sqlalchemy import Column, String, Float, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.models.pizza import Base


class StatusEnum(PyEnum):
    pending = "pending"
    active = "active"
    declined = "declined"

class Order(Base):
    __tablename__ = "order"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    customer_name: Mapped[str] = mapped_column(String, nullable=False)
    customer_email: Mapped[str] = mapped_column(String, nullable=False)
    items: Mapped[List[dict]] = mapped_column(JSON, nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    status: Mapped[StatusEnum] = mapped_column(Enum(StatusEnum), default=StatusEnum.pending, nullable=False)
