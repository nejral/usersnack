from fastapi import FastAPI

from app.router import pizza

app = FastAPI(title="Usersnack Pizza API")

app.include_router(pizza.router, prefix="/api", tags=["Pizzas"])

@app.get("/")
def root():
    return {"message": "Usersnack API is running"}
