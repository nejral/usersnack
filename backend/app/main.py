from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from app.router import pizza, order

app = FastAPI(title="Usersnack Pizza API")

origins = [
    "https://jolly-horse-7f6ff4.netlify.app",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pizza.router, prefix="/api", tags=["Pizzas"])
app.include_router(order.router, prefix="/api", tags=["Order"])

@app.get("/")
def root():
    return {"message": "Usersnack API is running"}

# @app.on_event("startup")
# async def on_startup():
#     await init_db(engine)
