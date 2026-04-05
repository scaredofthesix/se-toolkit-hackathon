from fastapi import APIRouter, Depends, Path, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import ShoppingList, RecipeIngredient, Ingredient, User
from app.schemas.schemas import ShoppingItemOut
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/api/shopping-list", tags=["shopping"])


@router.post("/generate/{recipe_id}")
def generate_shopping_list(
    recipe_id: int = Path(...),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    recipe_ings = db.query(RecipeIngredient).filter(RecipeIngredient.recipe_id == recipe_id).all()
    added = 0
    for ri in recipe_ings:
        exists = db.query(ShoppingList).filter(
            ShoppingList.user_id == user.id,
            ShoppingList.ingredient_id == ri.ingredient_id,
        ).first()
        if not exists:
            item = ShoppingList(user_id=user.id, ingredient_id=ri.ingredient_id)
            db.add(item)
            added += 1
    db.commit()
    return {"added": added}


@router.get("", response_model=list[ShoppingItemOut])
def get_shopping_list(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    items = db.query(ShoppingList).filter(ShoppingList.user_id == user.id).all()
    result = []
    for item in items:
        ing = db.query(Ingredient).filter(Ingredient.id == item.ingredient_id).first()
        result.append(ShoppingItemOut(
            id=item.id,
            ingredient_id=item.ingredient_id,
            ingredient_name=ing.name if ing else "Unknown",
            checked=item.checked,
        ))
    return result


@router.patch("/{item_id}")
def toggle_checked(item_id: int = Path(...), db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    item = db.query(ShoppingList).filter(
        ShoppingList.id == item_id, ShoppingList.user_id == user.id
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    item.checked = not item.checked
    db.commit()
    return {"checked": item.checked}
