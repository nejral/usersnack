import json

from sqlalchemy import Integer, String, Float, Text
from sqlalchemy.orm import declarative_base, mapped_column, Mapped

from app.models.base import Base


class Pizza(Base):
    __tablename__ = "pizza"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    ingredients: Mapped[str] = mapped_column(Text, nullable=False)
    img: Mapped[str] = mapped_column(String, nullable=False)

    @property
    def ingredients_list(self) -> list[str]:
        return json.loads(self.ingredients)

    @ingredients_list.setter
    def ingredients_list(self, ingredients: list[str]):
        self.ingredients = json.dumps(ingredients)
