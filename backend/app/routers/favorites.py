from fastapi import APIRouter, Depends, Path
from sqlalchemy.orm import Session, joinedload
from app.database import get_db
from app.models.models import Favorite, Recipe, User
from app.schemas.schemas import RecipeOut
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/api/favorites", tags=["favorites"])


@router.post("/{recipe_id}")
def toggle_favorite(recipe_id: int = Path(...), db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    existing = db.query(Favorite).filter(
        Favorite.user_id == user.id, Favorite.recipe_id == recipe_id
    ).first()
    if existing:
        db.delete(existing)
        db.commit()
        return {"status": "removed"}
    else:
        fav = Favorite(user_id=user.id, recipe_id=recipe_id)
        db.add(fav)
        db.commit()
        return {"status": "added"}


@router.get("", response_model=list[RecipeOut])
def get_favorites(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    favs = db.query(Favorite).filter(Favorite.user_id == user.id).all()
    recipe_ids = [f.recipe_id for f in favs]
    if not recipe_ids:
        return []
    return db.query(Recipe).filter(Recipe.id.in_(recipe_ids)).all()
