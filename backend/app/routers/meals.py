from datetime import date, timedelta
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models.models import MealLog, Recipe, User
from app.schemas.schemas import MealLogCreate, MealLogOut, DaySummary, WeekSummary
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/api/meals", tags=["meals"])


@router.post("/log", response_model=MealLogOut)
def log_meal(data: MealLogCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    recipe = db.query(Recipe).filter(Recipe.id == data.recipe_id).first()
    if not recipe:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Recipe not found")

    meal = MealLog(
        user_id=user.id,
        recipe_id=data.recipe_id,
        total_calories=recipe.calories,
    )
    db.add(meal)
    db.commit()
    db.refresh(meal)

    return MealLogOut(
        id=meal.id,
        recipe_id=meal.recipe_id,
        recipe_title=recipe.title,
        date=meal.date,
        total_calories=meal.total_calories,
    )


@router.get("/today", response_model=DaySummary)
def today_meals(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    meals = (
        db.query(MealLog)
        .filter(MealLog.user_id == user.id, MealLog.date == date.today())
        .all()
    )
    items = []
    total = 0
    for m in meals:
        recipe = db.query(Recipe).filter(Recipe.id == m.recipe_id).first()
        items.append(MealLogOut(
            id=m.id,
            recipe_id=m.recipe_id,
            recipe_title=recipe.title if recipe else "Unknown",
            date=m.date,
            total_calories=m.total_calories,
        ))
        total += m.total_calories or 0

    return DaySummary(meals=items, total_calories=total, daily_target=user.daily_calorie_target)


@router.get("/week", response_model=WeekSummary)
def week_summary(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    today = date.today()
    start = today - timedelta(days=6)
    rows = (
        db.query(MealLog.date, func.sum(MealLog.total_calories))
        .filter(MealLog.user_id == user.id, MealLog.date >= start)
        .group_by(MealLog.date)
        .all()
    )
    days = {}
    for d in range(7):
        day = start + timedelta(days=d)
        days[day.isoformat()] = 0
    for row_date, cals in rows:
        days[row_date.isoformat()] = cals or 0

    return WeekSummary(days=days, daily_target=user.daily_calorie_target)
