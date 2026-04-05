from sqlalchemy import (
    Column, Integer, String, Float, Text, Boolean, Date, ForeignKey, TIMESTAMP
)
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(150), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    goal = Column(String(20))
    level = Column(String(15))
    daily_calorie_target = Column(Integer)
    created_at = Column(TIMESTAMP, server_default=func.now())

    meals = relationship("MealLog", back_populates="user")
    favorites = relationship("Favorite", back_populates="user")
    shopping_items = relationship("ShoppingList", back_populates="user")


class Ingredient(Base):
    __tablename__ = "ingredients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True)
    category = Column(String(50))


class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200))
    instructions = Column(Text)
    cook_time = Column(Integer)
    difficulty = Column(String(15))
    image_url = Column(Text)
    calories = Column(Integer)
    protein = Column(Float)
    carbs = Column(Float)
    fat = Column(Float)
    goal_tags = Column(ARRAY(String))

    recipe_ingredients = relationship("RecipeIngredient", back_populates="recipe")
    favorites = relationship("Favorite", back_populates="recipe")


class RecipeIngredient(Base):
    __tablename__ = "recipe_ingredients"

    recipe_id = Column(Integer, ForeignKey("recipes.id"), primary_key=True)
    ingredient_id = Column(Integer, ForeignKey("ingredients.id"), primary_key=True)
    amount = Column(Float)
    unit = Column(String(20))

    recipe = relationship("Recipe", back_populates="recipe_ingredients")
    ingredient = relationship("Ingredient")


class MealLog(Base):
    __tablename__ = "meal_log"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    recipe_id = Column(Integer, ForeignKey("recipes.id"))
    date = Column(Date, server_default=func.current_date())
    total_calories = Column(Integer)

    user = relationship("User", back_populates="meals")
    recipe = relationship("Recipe")


class Favorite(Base):
    __tablename__ = "favorites"

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    recipe_id = Column(Integer, ForeignKey("recipes.id"), primary_key=True)

    user = relationship("User", back_populates="favorites")
    recipe = relationship("Recipe", back_populates="favorites")


class ShoppingList(Base):
    __tablename__ = "shopping_list"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    ingredient_id = Column(Integer, ForeignKey("ingredients.id"))
    checked = Column(Boolean, default=False)

    user = relationship("User", back_populates="shopping_items")
    ingredient = relationship("Ingredient")
