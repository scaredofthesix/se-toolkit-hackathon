from fastapi import APIRouter, Depends, Path, HTTPException
from sqlalchemy.orm import Session, subqueryload
from app.database import get_db
from app.models.models import Recipe, RecipeIngredient, Ingredient
from app.schemas.schemas import RecipeMatchRequest, RecipeMatchOut, RecipeIngredientOut, RecipeOut

router = APIRouter(prefix="/api/recipes", tags=["recipes"])

DIFFICULTY_MAP = {
    "beginner": ["easy"],
    "intermediate": ["easy", "medium"],
    "advanced": ["easy", "medium", "hard"],
}


@router.post("/match", response_model=list[RecipeMatchOut])
def match_recipes(data: RecipeMatchRequest, db: Session = Depends(get_db)):
    query = db.query(Recipe).options(
        subqueryload(Recipe.recipe_ingredients).subqueryload(RecipeIngredient.ingredient)
    )

    if data.goal:
        query = query.filter(Recipe.goal_tags.contains([data.goal]))

    if data.level:
        allowed = DIFFICULTY_MAP.get(data.level, ["easy", "medium", "hard"])
        query = query.filter(Recipe.difficulty.in_(allowed))

    recipes = query.all()

    # Fallback: if filters return nothing, try without goal filter
    if not recipes and data.goal:
        query = db.query(Recipe).options(
            subqueryload(Recipe.recipe_ingredients).subqueryload(RecipeIngredient.ingredient)
        )
        if data.level:
            allowed = DIFFICULTY_MAP.get(data.level, ["easy", "medium", "hard"])
            query = query.filter(Recipe.difficulty.in_(allowed))
        recipes = query.all()

    user_ids = set(data.ingredient_ids)
    results = []

    for recipe in recipes:
        all_ri = recipe.recipe_ingredients
        total = len(all_ri)
        if total == 0:
            continue

        matched = []
        missing = []
        for ri in all_ri:
            item = RecipeIngredientOut(
                ingredient_id=ri.ingredient_id,
                ingredient_name=ri.ingredient.name,
                amount=ri.amount,
                unit=ri.unit,
            )
            if ri.ingredient_id in user_ids:
                matched.append(item)
            else:
                missing.append(item)

        pct = round(len(matched) / total * 100, 1)

        results.append(RecipeMatchOut(
            id=recipe.id,
            title=recipe.title,
            cook_time=recipe.cook_time,
            difficulty=recipe.difficulty,
            image_url=recipe.image_url,
            calories=recipe.calories,
            protein=recipe.protein,
            carbs=recipe.carbs,
            fat=recipe.fat,
            goal_tags=recipe.goal_tags,
            match_percentage=pct,
            total_ingredients=total,
            matched_ingredients=matched,
            missing_ingredients=missing,
        ))

    results.sort(key=lambda r: r.match_percentage, reverse=True)
    return results


@router.get("/{recipe_id}", response_model=RecipeOut)
def get_recipe(recipe_id: int = Path(...), db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe
