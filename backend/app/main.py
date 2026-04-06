from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.database import engine, Base
from app.routers import auth, ingredients, recipes, meals, favorites, shopping, admin

Base.metadata.create_all(bind=engine)

app = FastAPI(title="WhatToEat API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://10.93.24.236:5173", "http://10.93.24.236"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(auth.router)
app.include_router(ingredients.router)
app.include_router(recipes.router)
app.include_router(meals.router)
app.include_router(favorites.router)
app.include_router(shopping.router)
app.include_router(admin.router)


@app.get("/")
def root():
    return {"message": "WhatToEat API is running"}
