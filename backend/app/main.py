from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.router import pizza, order

app = FastAPI(title="Usersnack Pizza API")

app.include_router(pizza.router, prefix="/api", tags=["Pizzas"])
app.include_router(order.router, prefix="/api", tags=["Order"])

@app.get("/")
def root():
    return {"message": "Usersnack API is running"}

# @app.on_event("startup")
# async def on_startup():
#     await init_db(engine)
