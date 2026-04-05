from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date


# --- Auth ---
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    goal: str
    level: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    goal: Optional[str] = None
    level: Optional[str] = None
    daily_calorie_target: Optional[int] = None

    model_config = {"from_attributes": True}


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# --- Ingredients ---
class IngredientOut(BaseModel):
    id: int
    name: str
    category: Optional[str] = None

    model_config = {"from_attributes": True}


# --- Recipes ---
class RecipeMatchRequest(BaseModel):
    ingredient_ids: list[int]
    goal: Optional[str] = None
    level: Optional[str] = None


class RecipeIngredientOut(BaseModel):
    ingredient_id: int
    ingredient_name: str
    amount: Optional[float] = None
    unit: Optional[str] = None


class RecipeOut(BaseModel):
    id: int
    title: str
    instructions: Optional[str] = None
    cook_time: Optional[int] = None
    difficulty: Optional[str] = None
    image_url: Optional[str] = None
    calories: Optional[int] = None
    protein: Optional[float] = None
    carbs: Optional[float] = None
    fat: Optional[float] = None
    goal_tags: Optional[list[str]] = None

    model_config = {"from_attributes": True}


class RecipeMatchOut(BaseModel):
    id: int
    title: str
    cook_time: Optional[int] = None
    difficulty: Optional[str] = None
    image_url: Optional[str] = None
    calories: Optional[int] = None
    protein: Optional[float] = None
    carbs: Optional[float] = None
    fat: Optional[float] = None
    goal_tags: Optional[list[str]] = None
    match_percentage: float
    total_ingredients: int
    matched_ingredients: list[RecipeIngredientOut]
    missing_ingredients: list[RecipeIngredientOut]


# --- Meals ---
class MealLogCreate(BaseModel):
    recipe_id: int


class MealLogOut(BaseModel):
    id: int
    recipe_id: int
    recipe_title: str
    date: date
    total_calories: Optional[int] = None


class DaySummary(BaseModel):
    meals: list[MealLogOut]
    total_calories: int
    daily_target: Optional[int] = None


class WeekSummary(BaseModel):
    days: dict[str, int]
    daily_target: Optional[int] = None


# --- Shopping List ---
class ShoppingItemOut(BaseModel):
    id: int
    ingredient_id: int
    ingredient_name: str
    checked: bool

    model_config = {"from_attributes": True}
