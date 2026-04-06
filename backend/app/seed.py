"""Seed the database with ingredients and recipes."""
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.database import engine, SessionLocal, Base
from app.models.models import Ingredient, Recipe, RecipeIngredient

Base.metadata.create_all(bind=engine)


INGREDIENTS = [
    # Meat & Protein (1-12)
    ("chicken breast", "meat"), ("ground beef", "meat"), ("salmon fillet", "meat"),
    ("shrimp", "meat"), ("turkey breast", "meat"), ("pork tenderloin", "meat"),
    ("eggs", "meat"), ("tofu", "meat"), ("bacon", "meat"),
    ("canned tuna", "meat"), ("sausage", "meat"), ("ground turkey", "meat"),
    # Dairy (13-18)
    ("milk", "dairy"), ("cheddar cheese", "dairy"), ("greek yogurt", "dairy"),
    ("parmesan cheese", "dairy"), ("cream cheese", "dairy"), ("butter", "dairy"),
    # Vegetables (19-34)
    ("onion", "vegetable"), ("garlic", "vegetable"), ("tomato", "vegetable"),
    ("bell pepper", "vegetable"), ("broccoli", "vegetable"), ("spinach", "vegetable"),
    ("carrot", "vegetable"), ("zucchini", "vegetable"), ("mushrooms", "vegetable"),
    ("sweet potato", "vegetable"), ("avocado", "vegetable"), ("cucumber", "vegetable"),
    ("lettuce", "vegetable"), ("corn", "vegetable"), ("green beans", "vegetable"),
    ("kale", "vegetable"),
    # Grains & Pasta (35-41)
    ("rice", "grain"), ("pasta", "grain"), ("bread", "grain"),
    ("tortilla", "grain"), ("oats", "grain"), ("quinoa", "grain"),
    ("flour", "grain"),
    # Fruits (42-45)
    ("lemon", "fruit"), ("banana", "fruit"), ("blueberries", "fruit"),
    ("apple", "fruit"),
    # Spices & Pantry (46-55)
    ("olive oil", "pantry"), ("soy sauce", "pantry"), ("salt", "spice"),
    ("black pepper", "spice"), ("cumin", "spice"), ("paprika", "spice"),
    ("chili flakes", "spice"), ("honey", "pantry"), ("tomato sauce", "pantry"),
    ("chicken broth", "pantry"),
    # Extra Vegetables (56-60)
    ("asparagus", "vegetable"), ("eggplant", "vegetable"), ("cabbage", "vegetable"),
    ("peas", "vegetable"), ("radish", "vegetable"),
    # Extra Fruits (61-63)
    ("mango", "fruit"), ("strawberries", "fruit"), ("orange", "fruit"),
    # Extra Protein (64-66)
    ("lamb", "meat"), ("duck breast", "meat"), ("cottage cheese", "dairy"),
    # Extra Pantry (67-70)
    ("coconut milk", "pantry"), ("peanut butter", "pantry"), ("rice vinegar", "pantry"),
    ("sesame oil", "pantry"),
    # Extra Vegetables continued (71-72)
    ("cauliflower", "vegetable"), ("celery", "vegetable"),
]


RECIPES = [
    # ---- WEIGHT LOSS (low cal, high protein) ----
    {
        "title": "Grilled Chicken & Spinach Salad",
        "instructions": "1. Season chicken breast with salt, pepper, and paprika.\n2. Grill chicken for 6-7 minutes per side until cooked through.\n3. Let rest 5 minutes, then slice.\n4. Toss spinach, cucumber, and tomato with lemon juice and olive oil.\n5. Top with sliced chicken and serve.",
        "cook_time": 20, "difficulty": "easy", "calories": 350, "protein": 42, "carbs": 8, "fat": 16,
        "goal_tags": ["weight_loss", "healthy"],
        "image_url": "/static/images/01_grilled_chicken_spinach_salad.jpg",
        "ingredients": [(1, 200, "g"), (24, 100, "g"), (30, 1, "whole"), (21, 1, "whole"), (42, 1, "whole"), (46, 1, "tbsp"), (48, 1, "pinch"), (49, 1, "pinch")]
    },
    {
        "title": "Turkey Lettuce Wraps",
        "instructions": "1. Heat olive oil in a skillet over medium-high heat.\n2. Cook ground turkey, breaking it up, for 5-6 minutes.\n3. Add diced onion, garlic, soy sauce, and a squeeze of lemon.\n4. Cook another 3 minutes.\n5. Spoon filling into lettuce leaves, top with diced bell pepper.",
        "cook_time": 15, "difficulty": "easy", "calories": 280, "protein": 32, "carbs": 10, "fat": 13,
        "goal_tags": ["weight_loss", "healthy"],
        "image_url": "/static/images/02_turkey_lettuce_wraps.jpg",
        "ingredients": [(12, 250, "g"), (31, 4, "leaves"), (19, 1, "whole"), (20, 2, "cloves"), (47, 1, "tbsp"), (42, 0.5, "whole"), (46, 1, "tbsp"), (22, 0.5, "whole")]
    },
    {
        "title": "Shrimp & Zucchini Noodles",
        "instructions": "1. Spiralize zucchini into noodles (or use a peeler for ribbons).\n2. Heat olive oil in a large pan.\n3. Sauté garlic for 30 seconds, add shrimp.\n4. Cook shrimp 2-3 minutes per side until pink.\n5. Add zucchini noodles, toss for 2 minutes.\n6. Season with lemon, salt, pepper, and chili flakes.",
        "cook_time": 15, "difficulty": "easy", "calories": 290, "protein": 34, "carbs": 8, "fat": 14,
        "goal_tags": ["weight_loss", "healthy"],
        "image_url": "/static/images/03_shrimp_zucchini_noodles.jpg",
        "ingredients": [(4, 250, "g"), (26, 2, "whole"), (20, 3, "cloves"), (46, 1, "tbsp"), (42, 1, "whole"), (48, 1, "pinch"), (49, 1, "pinch"), (52, 0.5, "tsp")]
    },
    {
        "title": "Egg White Veggie Omelette",
        "instructions": "1. Whisk 4 egg whites with a pinch of salt.\n2. Heat a non-stick pan with a little olive oil.\n3. Sauté diced bell pepper, spinach, and mushrooms for 2 minutes.\n4. Pour egg whites over vegetables.\n5. Cook until set, fold in half, and serve.",
        "cook_time": 10, "difficulty": "easy", "calories": 180, "protein": 24, "carbs": 6, "fat": 6,
        "goal_tags": ["weight_loss", "healthy"],
        "image_url": "/static/images/04_egg_white_veggie_omelette.jpg",
        "ingredients": [(7, 4, "whites"), (22, 0.5, "whole"), (24, 30, "g"), (27, 50, "g"), (46, 0.5, "tsp"), (48, 1, "pinch")]
    },
    {
        "title": "Tuna Stuffed Avocado",
        "instructions": "1. Halve an avocado and remove the pit.\n2. Drain canned tuna and mix with diced celery, lemon juice, and a touch of Greek yogurt.\n3. Season with salt and pepper.\n4. Scoop tuna mixture into avocado halves.\n5. Sprinkle with paprika and serve.",
        "cook_time": 10, "difficulty": "easy", "calories": 320, "protein": 28, "carbs": 10, "fat": 20,
        "goal_tags": ["weight_loss", "healthy"],
        "image_url": "/static/images/05_tuna_stuffed_avocado.jpg",
        "ingredients": [(10, 1, "can"), (29, 1, "whole"), (72, 1, "stalk"), (42, 0.5, "whole"), (15, 1, "tbsp"), (48, 1, "pinch"), (49, 1, "pinch"), (51, 0.5, "tsp")]
    },
    {
        "title": "Cauliflower Fried Rice",
        "instructions": "1. Pulse cauliflower in a food processor until rice-sized.\n2. Heat olive oil in a wok or large pan.\n3. Scramble eggs, set aside.\n4. Sauté diced carrot, green beans, and garlic for 3 minutes.\n5. Add cauliflower rice, cook 4 minutes.\n6. Add soy sauce and scrambled eggs, toss to combine.",
        "cook_time": 20, "difficulty": "easy", "calories": 250, "protein": 16, "carbs": 15, "fat": 14,
        "goal_tags": ["weight_loss", "healthy"],
        "image_url": "/static/images/06_cauliflower_fried_rice.jpg",
        "ingredients": [(71, 1, "head"), (7, 2, "whole"), (25, 1, "whole"), (32, 50, "g"), (20, 2, "cloves"), (47, 2, "tbsp"), (46, 1, "tbsp")]
    },
    # ---- MUSCLE GAIN (high protein, high cal) ----
    {
        "title": "Chicken & Rice Power Bowl",
        "instructions": "1. Cook rice according to package directions.\n2. Season chicken breast with cumin, paprika, salt, and pepper.\n3. Pan-sear chicken in olive oil, 6-7 minutes per side.\n4. Slice chicken and serve over rice.\n5. Top with sliced avocado and a squeeze of lemon.",
        "cook_time": 30, "difficulty": "easy", "calories": 650, "protein": 48, "carbs": 55, "fat": 22,
        "goal_tags": ["muscle_gain"],
        "image_url": "/static/images/07_chicken_rice_power_bowl.jpg",
        "ingredients": [(1, 250, "g"), (35, 200, "g"), (29, 0.5, "whole"), (42, 0.5, "whole"), (46, 1, "tbsp"), (50, 1, "tsp"), (51, 1, "tsp"), (48, 1, "pinch"), (49, 1, "pinch")]
    },
    {
        "title": "Beef & Broccoli Stir-Fry",
        "instructions": "1. Slice beef into thin strips.\n2. Heat olive oil in a wok over high heat.\n3. Stir-fry beef for 2-3 minutes, set aside.\n4. Add broccoli florets and garlic, cook 3 minutes.\n5. Return beef, add soy sauce and a splash of chicken broth.\n6. Serve over rice.",
        "cook_time": 25, "difficulty": "medium", "calories": 580, "protein": 45, "carbs": 40, "fat": 24,
        "goal_tags": ["muscle_gain", "maintenance"],
        "image_url": "/static/images/08_beef_broccoli_stirfry.jpg",
        "ingredients": [(2, 300, "g"), (23, 200, "g"), (20, 3, "cloves"), (47, 3, "tbsp"), (55, 60, "ml"), (35, 200, "g"), (46, 1, "tbsp")]
    },
    {
        "title": "Salmon Quinoa Bowl",
        "instructions": "1. Cook quinoa in water for 15 minutes.\n2. Season salmon with salt, pepper, and lemon.\n3. Pan-sear salmon skin-side down for 4 minutes, flip, cook 3 more.\n4. Fluff quinoa and place in a bowl.\n5. Top with salmon, sliced avocado, and spinach.",
        "cook_time": 25, "difficulty": "medium", "calories": 620, "protein": 44, "carbs": 38, "fat": 30,
        "goal_tags": ["muscle_gain", "healthy"],
        "image_url": "/static/images/09_salmon_quinoa_bowl.jpg",
        "ingredients": [(3, 200, "g"), (40, 150, "g"), (29, 0.5, "whole"), (24, 50, "g"), (42, 1, "whole"), (48, 1, "pinch"), (49, 1, "pinch"), (46, 1, "tbsp")]
    },
    {
        "title": "Protein Pancakes with Banana",
        "instructions": "1. Mash banana in a bowl.\n2. Add eggs, oats, and Greek yogurt. Mix well.\n3. Heat a non-stick pan with a bit of butter.\n4. Pour batter to form pancakes, cook 2-3 minutes per side.\n5. Stack and top with honey and blueberries.",
        "cook_time": 15, "difficulty": "easy", "calories": 480, "protein": 30, "carbs": 58, "fat": 14,
        "goal_tags": ["muscle_gain"],
        "image_url": "/static/images/10_protein_pancakes_banana.jpg",
        "ingredients": [(43, 2, "whole"), (7, 3, "whole"), (39, 80, "g"), (15, 60, "g"), (18, 1, "tsp"), (53, 1, "tbsp"), (44, 30, "g")]
    },
    {
        "title": "Double Cheeseburger Bowl (No Bun)",
        "instructions": "1. Form ground beef into two patties, season with salt and pepper.\n2. Cook in a hot skillet for 4 minutes per side.\n3. In the last minute, top each patty with cheddar cheese to melt.\n4. Serve over chopped lettuce with tomato, onion, and avocado.\n5. Drizzle with a little olive oil and mustard if desired.",
        "cook_time": 15, "difficulty": "easy", "calories": 700, "protein": 52, "carbs": 8, "fat": 52,
        "goal_tags": ["muscle_gain"],
        "image_url": "/static/images/11_double_cheeseburger_bowl.jpg",
        "ingredients": [(2, 300, "g"), (14, 60, "g"), (31, 100, "g"), (21, 1, "whole"), (19, 0.5, "whole"), (29, 0.5, "whole"), (48, 1, "pinch"), (49, 1, "pinch")]
    },
    {
        "title": "Pork Stir-Fry with Noodles",
        "instructions": "1. Cook pasta/noodles according to package.\n2. Slice pork tenderloin into thin strips.\n3. Heat oil in a wok, stir-fry pork 3-4 minutes.\n4. Add sliced bell pepper, carrot, and garlic. Cook 3 minutes.\n5. Add cooked noodles, soy sauce, and toss everything.\n6. Finish with a squeeze of lemon.",
        "cook_time": 25, "difficulty": "medium", "calories": 620, "protein": 40, "carbs": 60, "fat": 22,
        "goal_tags": ["muscle_gain", "maintenance"],
        "image_url": "/static/images/12_pork_stirfry_noodles.jpg",
        "ingredients": [(6, 250, "g"), (36, 200, "g"), (22, 1, "whole"), (25, 1, "whole"), (20, 2, "cloves"), (47, 2, "tbsp"), (46, 1, "tbsp"), (42, 0.5, "whole")]
    },
    # ---- MAINTENANCE ----
    {
        "title": "Classic Spaghetti Bolognese",
        "instructions": "1. Heat olive oil, sauté diced onion and garlic until soft.\n2. Add ground beef, cook until browned.\n3. Pour in tomato sauce, season with salt, pepper, and a pinch of sugar.\n4. Simmer 20 minutes.\n5. Cook pasta al dente, drain.\n6. Serve sauce over pasta, top with parmesan.",
        "cook_time": 35, "difficulty": "medium", "calories": 550, "protein": 32, "carbs": 55, "fat": 22,
        "goal_tags": ["maintenance"],
        "image_url": "/static/images/13_spaghetti_bolognese.jpg",
        "ingredients": [(2, 200, "g"), (36, 200, "g"), (54, 200, "ml"), (19, 1, "whole"), (20, 3, "cloves"), (16, 30, "g"), (46, 1, "tbsp"), (48, 1, "pinch"), (49, 1, "pinch")]
    },
    {
        "title": "Chicken Caesar Wrap",
        "instructions": "1. Season and grill chicken breast, then slice.\n2. Warm a tortilla.\n3. Layer lettuce, sliced chicken, and shaved parmesan.\n4. Drizzle with olive oil and lemon juice as dressing.\n5. Roll tightly and cut in half.",
        "cook_time": 20, "difficulty": "easy", "calories": 480, "protein": 38, "carbs": 30, "fat": 22,
        "goal_tags": ["maintenance", "healthy"],
        "image_url": "/static/images/14_chicken_caesar_wrap.jpg",
        "ingredients": [(1, 180, "g"), (38, 1, "whole"), (31, 60, "g"), (16, 20, "g"), (46, 1, "tbsp"), (42, 0.5, "whole"), (48, 1, "pinch"), (49, 1, "pinch")]
    },
    {
        "title": "Veggie Fried Rice",
        "instructions": "1. Cook rice and let it cool (day-old rice works best).\n2. Heat oil in a wok, scramble eggs, set aside.\n3. Stir-fry diced carrot, corn, green beans, and garlic for 3 minutes.\n4. Add rice, soy sauce, stir-fry 3-4 minutes.\n5. Mix in scrambled eggs, season with pepper.",
        "cook_time": 20, "difficulty": "easy", "calories": 420, "protein": 14, "carbs": 58, "fat": 14,
        "goal_tags": ["maintenance", "healthy"],
        "image_url": "/static/images/15_veggie_fried_rice.jpg",
        "ingredients": [(35, 250, "g"), (7, 2, "whole"), (25, 1, "whole"), (32, 50, "g"), (33, 50, "g"), (20, 2, "cloves"), (47, 2, "tbsp"), (46, 1, "tbsp")]
    },
    {
        "title": "Sweet Potato & Black Bean Tacos",
        "instructions": "1. Peel and dice sweet potato, toss with olive oil, cumin, and paprika.\n2. Roast at 200°C for 20 minutes.\n3. Warm tortillas.\n4. Fill with roasted sweet potato, top with diced avocado and tomato.\n5. Squeeze lemon juice over tacos and serve.",
        "cook_time": 30, "difficulty": "easy", "calories": 410, "protein": 12, "carbs": 55, "fat": 16,
        "goal_tags": ["maintenance", "healthy"],
        "image_url": "/static/images/16_sweet_potato_tacos.jpg",
        "ingredients": [(28, 2, "whole"), (38, 3, "whole"), (29, 1, "whole"), (21, 1, "whole"), (42, 1, "whole"), (46, 1, "tbsp"), (50, 1, "tsp"), (51, 1, "tsp")]
    },
    {
        "title": "Mushroom Risotto",
        "instructions": "1. Heat broth in a saucepan, keep warm.\n2. In another pan, sauté diced onion in butter until soft.\n3. Add rice, stir 1 minute.\n4. Add broth one ladle at a time, stirring until absorbed.\n5. After 10 minutes, add sliced mushrooms.\n6. Continue adding broth until rice is creamy (about 18 min total).\n7. Stir in parmesan, season with salt and pepper.",
        "cook_time": 35, "difficulty": "hard", "calories": 480, "protein": 14, "carbs": 60, "fat": 18,
        "goal_tags": ["maintenance"],
        "image_url": "/static/images/17_mushroom_risotto.jpg",
        "ingredients": [(27, 200, "g"), (35, 200, "g"), (55, 500, "ml"), (19, 1, "whole"), (18, 30, "g"), (16, 40, "g"), (48, 1, "pinch"), (49, 1, "pinch")]
    },
    {
        "title": "Teriyaki Chicken with Rice",
        "instructions": "1. Mix soy sauce, honey, and garlic for teriyaki sauce.\n2. Marinate chicken thigh pieces for 10 minutes.\n3. Cook rice.\n4. Pan-fry chicken until caramelized and cooked through, about 8 minutes.\n5. Serve chicken over rice with steamed broccoli.\n6. Drizzle remaining sauce on top.",
        "cook_time": 30, "difficulty": "medium", "calories": 520, "protein": 36, "carbs": 58, "fat": 14,
        "goal_tags": ["maintenance"],
        "image_url": "/static/images/18_teriyaki_chicken_rice.jpg",
        "ingredients": [(1, 250, "g"), (35, 200, "g"), (47, 3, "tbsp"), (53, 2, "tbsp"), (20, 3, "cloves"), (23, 100, "g"), (46, 1, "tbsp")]
    },
    # ---- HEALTHY ----
    {
        "title": "Mediterranean Quinoa Salad",
        "instructions": "1. Cook quinoa and let cool.\n2. Dice cucumber, tomato, and bell pepper.\n3. Mix vegetables with quinoa.\n4. Add crumbled feta or parmesan, olive oil, and lemon juice.\n5. Season with salt and pepper, toss well.\n6. Serve chilled.",
        "cook_time": 20, "difficulty": "easy", "calories": 380, "protein": 14, "carbs": 42, "fat": 18,
        "goal_tags": ["healthy", "weight_loss"],
        "image_url": "/static/images/19_mediterranean_quinoa_salad.jpg",
        "ingredients": [(40, 150, "g"), (30, 1, "whole"), (21, 1, "whole"), (22, 1, "whole"), (16, 20, "g"), (46, 2, "tbsp"), (42, 1, "whole"), (48, 1, "pinch"), (49, 1, "pinch")]
    },
    {
        "title": "Overnight Oats with Blueberries",
        "instructions": "1. In a jar, combine oats, milk, and Greek yogurt.\n2. Add a drizzle of honey.\n3. Stir well, cover, and refrigerate overnight.\n4. In the morning, top with blueberries and sliced banana.\n5. Enjoy cold.",
        "cook_time": 5, "difficulty": "easy", "calories": 350, "protein": 16, "carbs": 52, "fat": 8,
        "goal_tags": ["healthy", "maintenance"],
        "image_url": "/static/images/20_overnight_oats_blueberries.jpg",
        "ingredients": [(39, 80, "g"), (13, 150, "ml"), (15, 60, "g"), (53, 1, "tbsp"), (44, 50, "g"), (43, 0.5, "whole")]
    },
    {
        "title": "Grilled Salmon with Asparagus",
        "instructions": "1. Season salmon with salt, pepper, and lemon zest.\n2. Toss green beans (or asparagus) with olive oil and garlic.\n3. Grill salmon for 4 minutes per side.\n4. Grill vegetables alongside for 5 minutes.\n5. Plate and drizzle with lemon juice.",
        "cook_time": 20, "difficulty": "medium", "calories": 420, "protein": 40, "carbs": 8, "fat": 26,
        "goal_tags": ["healthy", "weight_loss"],
        "image_url": "/static/images/21_grilled_salmon_asparagus.jpg",
        "ingredients": [(3, 200, "g"), (33, 150, "g"), (20, 2, "cloves"), (42, 1, "whole"), (46, 1, "tbsp"), (48, 1, "pinch"), (49, 1, "pinch")]
    },
    {
        "title": "Kale & Apple Smoothie Bowl",
        "instructions": "1. Blend kale, banana, apple, Greek yogurt, and a splash of milk until smooth.\n2. Pour into a bowl.\n3. Top with oats, blueberries, and a drizzle of honey.\n4. Serve immediately.",
        "cook_time": 5, "difficulty": "easy", "calories": 320, "protein": 14, "carbs": 56, "fat": 6,
        "goal_tags": ["healthy"],
        "image_url": "/static/images/22_kale_apple_smoothie_bowl.jpg",
        "ingredients": [(34, 50, "g"), (43, 1, "whole"), (45, 1, "whole"), (15, 80, "g"), (13, 50, "ml"), (39, 20, "g"), (44, 20, "g"), (53, 1, "tsp")]
    },
    {
        "title": "Stuffed Bell Peppers",
        "instructions": "1. Cut tops off bell peppers and remove seeds.\n2. Cook quinoa.\n3. Mix cooked quinoa with diced tomato, corn, spinach, and cumin.\n4. Stuff peppers with the mixture, top with cheese.\n5. Bake at 190°C for 25 minutes until peppers are tender.",
        "cook_time": 40, "difficulty": "medium", "calories": 380, "protein": 18, "carbs": 45, "fat": 14,
        "goal_tags": ["healthy", "maintenance"],
        "image_url": "/static/images/23_stuffed_bell_peppers.jpg",
        "ingredients": [(22, 4, "whole"), (40, 150, "g"), (21, 2, "whole"), (32, 50, "g"), (24, 40, "g"), (14, 50, "g"), (50, 1, "tsp"), (48, 1, "pinch")]
    },
    {
        "title": "Thai Coconut Shrimp Soup",
        "instructions": "1. Heat oil, sauté garlic and onion for 2 minutes.\n2. Add chicken broth and bring to a boil.\n3. Add shrimp, mushrooms, and carrot slices.\n4. Simmer 8 minutes.\n5. Stir in a splash of lemon juice and chili flakes.\n6. Season with salt and serve hot.",
        "cook_time": 20, "difficulty": "medium", "calories": 300, "protein": 30, "carbs": 12, "fat": 14,
        "goal_tags": ["healthy", "weight_loss"],
        "image_url": "/static/images/24_thai_coconut_shrimp_soup.jpg",
        "ingredients": [(4, 250, "g"), (55, 400, "ml"), (27, 100, "g"), (25, 1, "whole"), (20, 3, "cloves"), (19, 0.5, "whole"), (42, 1, "whole"), (52, 0.5, "tsp"), (46, 1, "tbsp"), (48, 1, "pinch")]
    },
    # ---- MIXED / ADVANCED ----
    {
        "title": "Homemade Margherita Pizza",
        "instructions": "1. Mix flour, water, salt, and a tsp of olive oil to make dough. Knead 10 min, rest 30 min.\n2. Roll out dough into a circle.\n3. Spread tomato sauce evenly.\n4. Top with sliced tomato and mozzarella (or cheddar).\n5. Bake at 230°C for 12-15 minutes.\n6. Finish with fresh basil if available.",
        "cook_time": 60, "difficulty": "hard", "calories": 550, "protein": 22, "carbs": 65, "fat": 22,
        "goal_tags": ["maintenance"],
        "image_url": "/static/images/25_margherita_pizza.jpg",
        "ingredients": [(41, 250, "g"), (54, 100, "ml"), (21, 2, "whole"), (14, 100, "g"), (46, 1, "tbsp"), (48, 1, "pinch")]
    },
    {
        "title": "Eggs Benedict with Spinach",
        "instructions": "1. Toast bread slices.\n2. Wilt spinach in a pan with butter.\n3. Poach eggs in simmering water with a splash of lemon juice (3-4 min).\n4. Layer toast, spinach, bacon, and poached egg.\n5. Season with salt and pepper.",
        "cook_time": 20, "difficulty": "hard", "calories": 450, "protein": 26, "carbs": 28, "fat": 26,
        "goal_tags": ["maintenance"],
        "image_url": "/static/images/26_eggs_benedict_spinach.jpg",
        "ingredients": [(7, 2, "whole"), (37, 2, "slices"), (24, 50, "g"), (9, 2, "slices"), (18, 10, "g"), (42, 0.5, "whole"), (48, 1, "pinch"), (49, 1, "pinch")]
    },
    {
        "title": "Tofu Stir-Fry with Vegetables",
        "instructions": "1. Press tofu and cut into cubes.\n2. Pan-fry tofu in oil until golden on all sides, about 6 minutes.\n3. Remove tofu. Stir-fry bell pepper, broccoli, and carrot for 3 minutes.\n4. Add garlic and soy sauce.\n5. Return tofu, toss everything together.\n6. Serve over rice or noodles.",
        "cook_time": 20, "difficulty": "easy", "calories": 320, "protein": 22, "carbs": 18, "fat": 18,
        "goal_tags": ["healthy", "weight_loss"],
        "image_url": "/static/images/27_tofu_stirfry_vegetables.jpg",
        "ingredients": [(8, 300, "g"), (22, 1, "whole"), (23, 100, "g"), (25, 1, "whole"), (20, 2, "cloves"), (47, 2, "tbsp"), (46, 1, "tbsp")]
    },
    {
        "title": "Greek Yogurt Parfait",
        "instructions": "1. Layer Greek yogurt in a glass.\n2. Add a layer of oats.\n3. Add blueberries and sliced banana.\n4. Repeat layers.\n5. Drizzle honey on top and serve.",
        "cook_time": 5, "difficulty": "easy", "calories": 300, "protein": 18, "carbs": 44, "fat": 6,
        "goal_tags": ["healthy", "weight_loss"],
        "image_url": "/static/images/28_greek_yogurt_parfait.jpg",
        "ingredients": [(15, 200, "g"), (39, 40, "g"), (44, 50, "g"), (43, 1, "whole"), (53, 1, "tbsp")]
    },
    {
        "title": "BBQ Chicken Sweet Potato",
        "instructions": "1. Bake sweet potatoes at 200°C for 45 minutes until soft.\n2. Season chicken breast with paprika, salt, and pepper.\n3. Grill or pan-sear chicken for 6-7 min per side.\n4. Dice chicken.\n5. Split sweet potato open, stuff with chicken.\n6. Top with a drizzle of honey-soy glaze (mix honey + soy sauce).",
        "cook_time": 55, "difficulty": "medium", "calories": 520, "protein": 42, "carbs": 55, "fat": 12,
        "goal_tags": ["muscle_gain", "maintenance"],
        "image_url": "/static/images/29_bbq_chicken_sweet_potato.jpg",
        "ingredients": [(1, 200, "g"), (28, 2, "whole"), (51, 1, "tsp"), (48, 1, "pinch"), (49, 1, "pinch"), (53, 1, "tbsp"), (47, 1, "tbsp")]
    },
    {
        "title": "Mexican Chicken Burrito Bowl",
        "instructions": "1. Cook rice.\n2. Season chicken with cumin, paprika, salt. Pan-sear until done.\n3. Slice chicken.\n4. Assemble bowl: rice, chicken, corn, diced tomato, sliced avocado.\n5. Squeeze lemon over everything.\n6. Add hot sauce or chili flakes if desired.",
        "cook_time": 30, "difficulty": "medium", "calories": 580, "protein": 40, "carbs": 58, "fat": 18,
        "goal_tags": ["muscle_gain", "maintenance"],
        "image_url": "/static/images/30_mexican_burrito_bowl.jpg",
        "ingredients": [(1, 200, "g"), (35, 200, "g"), (32, 50, "g"), (21, 1, "whole"), (29, 0.5, "whole"), (42, 1, "whole"), (50, 1, "tsp"), (51, 1, "tsp"), (48, 1, "pinch")]
    },
    {
        "title": "Creamy Garlic Pasta",
        "instructions": "1. Cook pasta al dente.\n2. In a pan, melt butter and sauté garlic until fragrant.\n3. Add cream cheese and a splash of milk, stir until smooth.\n4. Toss in cooked pasta.\n5. Add parmesan, season with salt and pepper.\n6. Serve immediately.",
        "cook_time": 20, "difficulty": "easy", "calories": 520, "protein": 16, "carbs": 58, "fat": 24,
        "goal_tags": ["maintenance"],
        "image_url": "/static/images/31_creamy_garlic_pasta.jpg",
        "ingredients": [(36, 250, "g"), (20, 4, "cloves"), (18, 20, "g"), (17, 60, "g"), (13, 30, "ml"), (16, 30, "g"), (48, 1, "pinch"), (49, 1, "pinch")]
    },
    {
        "title": "Spicy Egg Fried Rice",
        "instructions": "1. Use day-old rice or cook and cool rice.\n2. Heat oil in a wok, scramble eggs.\n3. Add rice, soy sauce, and chili flakes.\n4. Stir-fry 4 minutes on high heat.\n5. Add diced green onion (or regular onion) and garlic.\n6. Serve hot.",
        "cook_time": 15, "difficulty": "easy", "calories": 450, "protein": 16, "carbs": 56, "fat": 18,
        "goal_tags": ["maintenance", "muscle_gain"],
        "image_url": "/static/images/32_spicy_egg_fried_rice.jpg",
        "ingredients": [(35, 300, "g"), (7, 3, "whole"), (47, 2, "tbsp"), (52, 1, "tsp"), (19, 0.5, "whole"), (20, 2, "cloves"), (46, 1, "tbsp")]
    },
    # ---- NEW RECIPES ----
    {
        "title": "Mango Chicken Bowl",
        "instructions": "1. Dice chicken and season with cumin, salt, pepper.\n2. Pan-sear in olive oil until golden.\n3. Cook rice.\n4. Peel and dice mango.\n5. Assemble bowl: rice, chicken, mango, sliced avocado.\n6. Squeeze lemon and drizzle soy sauce.",
        "cook_time": 25, "difficulty": "easy", "calories": 540, "protein": 38, "carbs": 52, "fat": 18,
        "goal_tags": ["muscle_gain", "healthy"],
        "image_url": "/static/images/33_mango_chicken_bowl.jpg",
        "ingredients": [(1, 200, "g"), (35, 180, "g"), (61, 1, "whole"), (29, 0.5, "whole"), (42, 0.5, "whole"), (47, 1, "tbsp"), (50, 1, "tsp"), (46, 1, "tbsp")]
    },
    {
        "title": "Eggplant Parmesan",
        "instructions": "1. Slice eggplant into rounds, salt and rest 15 min.\n2. Pat dry, dip in beaten egg, then coat with flour.\n3. Pan-fry in olive oil until golden.\n4. Layer in a baking dish: eggplant, tomato sauce, parmesan.\n5. Bake at 190°C for 20 minutes.\n6. Serve hot.",
        "cook_time": 45, "difficulty": "medium", "calories": 420, "protein": 18, "carbs": 35, "fat": 24,
        "goal_tags": ["maintenance", "healthy"],
        "image_url": "/static/images/34_eggplant_parmesan.jpg",
        "ingredients": [(57, 2, "whole"), (7, 2, "whole"), (41, 50, "g"), (54, 200, "ml"), (16, 40, "g"), (46, 2, "tbsp"), (48, 1, "pinch")]
    },
    {
        "title": "Peanut Butter Banana Oats",
        "instructions": "1. Cook oats with milk until thick.\n2. Slice banana.\n3. Top oats with banana slices, a spoonful of peanut butter, and honey.\n4. Sprinkle with a pinch of salt.\n5. Serve warm.",
        "cook_time": 10, "difficulty": "easy", "calories": 420, "protein": 16, "carbs": 58, "fat": 16,
        "goal_tags": ["muscle_gain", "healthy"],
        "image_url": "/static/images/35_peanut_butter_banana_oats.jpg",
        "ingredients": [(39, 80, "g"), (13, 200, "ml"), (43, 1, "whole"), (68, 1, "tbsp"), (53, 1, "tsp"), (48, 1, "pinch")]
    },
    {
        "title": "Lamb Kofta with Salad",
        "instructions": "1. Mix ground lamb with diced onion, cumin, paprika, salt, pepper.\n2. Shape into small cylinders.\n3. Grill or pan-fry 4 minutes per side.\n4. Serve over chopped lettuce, tomato, cucumber.\n5. Squeeze lemon and drizzle olive oil.",
        "cook_time": 25, "difficulty": "medium", "calories": 480, "protein": 36, "carbs": 10, "fat": 34,
        "goal_tags": ["muscle_gain", "maintenance"],
        "image_url": "/static/images/36_lamb_kofta_salad.jpg",
        "ingredients": [(64, 300, "g"), (19, 1, "whole"), (50, 1, "tsp"), (51, 1, "tsp"), (31, 80, "g"), (21, 1, "whole"), (30, 1, "whole"), (42, 1, "whole"), (46, 1, "tbsp")]
    },
    {
        "title": "Coconut Shrimp Curry",
        "instructions": "1. Heat sesame oil, sauté onion and garlic.\n2. Add diced bell pepper and cook 2 min.\n3. Pour in coconut milk, bring to simmer.\n4. Add shrimp, cook 5 minutes.\n5. Season with cumin, chili flakes, salt.\n6. Serve over rice.",
        "cook_time": 25, "difficulty": "medium", "calories": 520, "protein": 32, "carbs": 40, "fat": 26,
        "goal_tags": ["maintenance", "healthy"],
        "image_url": "/static/images/37_coconut_shrimp_curry.jpg",
        "ingredients": [(4, 250, "g"), (67, 200, "ml"), (22, 1, "whole"), (19, 1, "whole"), (20, 3, "cloves"), (35, 180, "g"), (50, 1, "tsp"), (52, 0.5, "tsp"), (70, 1, "tbsp")]
    },
    {
        "title": "Strawberry Spinach Salad",
        "instructions": "1. Wash and halve strawberries.\n2. Toss with fresh spinach and sliced avocado.\n3. Shave parmesan on top.\n4. Drizzle with olive oil and lemon juice.\n5. Season with salt and pepper.",
        "cook_time": 10, "difficulty": "easy", "calories": 280, "protein": 10, "carbs": 18, "fat": 20,
        "goal_tags": ["weight_loss", "healthy"],
        "image_url": "/static/images/38_strawberry_spinach_salad.jpg",
        "ingredients": [(62, 100, "g"), (24, 80, "g"), (29, 0.5, "whole"), (16, 20, "g"), (46, 1, "tbsp"), (42, 0.5, "whole"), (48, 1, "pinch"), (49, 1, "pinch")]
    },
    {
        "title": "Duck Breast with Orange Glaze",
        "instructions": "1. Score duck skin in a crosshatch pattern.\n2. Season with salt and pepper.\n3. Place skin-side down in a cold pan, cook on medium 8 min.\n4. Flip, cook 4 more minutes.\n5. Rest 5 minutes.\n6. Meanwhile, simmer orange juice with honey until thickened.\n7. Slice duck and drizzle with glaze.",
        "cook_time": 30, "difficulty": "hard", "calories": 480, "protein": 34, "carbs": 18, "fat": 30,
        "goal_tags": ["maintenance"],
        "image_url": "/static/images/39_duck_breast_orange_glaze.jpg",
        "ingredients": [(65, 250, "g"), (63, 1, "whole"), (53, 1, "tbsp"), (48, 1, "pinch"), (49, 1, "pinch"), (18, 10, "g")]
    },
    {
        "title": "Cabbage & Sausage Skillet",
        "instructions": "1. Slice sausage into rounds.\n2. Brown sausage in a hot skillet, set aside.\n3. In the same pan, sauté sliced cabbage and onion in olive oil for 5 min.\n4. Add garlic, cook 1 more minute.\n5. Return sausage, season with paprika, salt, pepper.\n6. Toss and serve.",
        "cook_time": 20, "difficulty": "easy", "calories": 440, "protein": 24, "carbs": 16, "fat": 32,
        "goal_tags": ["maintenance", "muscle_gain"],
        "image_url": "/static/images/40_cabbage_sausage_skillet.jpg",
        "ingredients": [(11, 200, "g"), (58, 300, "g"), (19, 1, "whole"), (20, 2, "cloves"), (46, 1, "tbsp"), (51, 1, "tsp"), (48, 1, "pinch"), (49, 1, "pinch")]
    },
]


def seed():
    db = SessionLocal()

    # Clear existing data (order matters for FK constraints)
    from app.models.models import MealLog, Favorite, ShoppingList
    db.query(ShoppingList).delete()
    db.query(Favorite).delete()
    db.query(MealLog).delete()
    db.query(RecipeIngredient).delete()
    db.query(Recipe).delete()
    db.query(Ingredient).delete()
    db.commit()

    # Insert ingredients
    for idx, (name, category) in enumerate(INGREDIENTS, 1):
        ing = Ingredient(id=idx, name=name, category=category)
        db.add(ing)
    db.commit()

    # Insert recipes
    for recipe_data in RECIPES:
        ingredients_list = recipe_data.pop("ingredients")
        recipe = Recipe(**recipe_data)
        db.add(recipe)
        db.flush()

        seen_ing_ids = set()
        for ing_id, amount, unit in ingredients_list:
            if ing_id in seen_ing_ids:
                continue
            seen_ing_ids.add(ing_id)
            ri = RecipeIngredient(
                recipe_id=recipe.id,
                ingredient_id=ing_id,
                amount=amount,
                unit=unit,
            )
            db.add(ri)

    db.commit()
    db.close()
    print(f"Seeded {len(INGREDIENTS)} ingredients and {len(RECIPES)} recipes.")


if __name__ == "__main__":
    seed()
