from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Ingredient
from app.schemas.schemas import IngredientOut

router = APIRouter(prefix="/api/ingredients", tags=["ingredients"])


@router.get("", response_model=list[IngredientOut])
def search_ingredients(search: str = Query("", min_length=0), db: Session = Depends(get_db)):
    query = db.query(Ingredient)
    if search:
        query = query.filter(Ingredient.name.ilike(f"%{search}%"))
    return query.order_by(Ingredient.name).limit(20).all()
