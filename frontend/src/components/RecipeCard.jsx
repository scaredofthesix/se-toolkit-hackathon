import { Link } from 'react-router-dom'
import MacroBars from './MacroBars'

export default function RecipeCard({ recipe, showMatch = false }) {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      state={{ recipe }}
      className="card rounded-2xl overflow-hidden flex flex-col group"
    >
      <div className="relative overflow-hidden">
        <img
          src={recipe.image_url || 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&q=80'}
          alt={recipe.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {showMatch && (
          <div className={`absolute top-4 right-4 font-body text-base font-semibold px-4 py-1.5 rounded-full ${
            recipe.match_percentage >= 50 ? 'bg-sand-900 text-sand-100' : 'bg-sand-300 text-sand-800'
          }`}>
            {recipe.match_percentage}%
          </div>
        )}
        <span className="absolute top-4 left-4 font-body text-base font-semibold px-4 py-1.5 rounded-full bg-white/80 text-sand-800 capitalize">
          {recipe.difficulty}
        </span>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white font-body text-base">
          <span className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">{recipe.cook_time} min</span>
          <span className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">{recipe.calories} cal</span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col gap-3">
        <h3 className="font-display font-bold text-sand-900 text-xl leading-tight">{recipe.title}</h3>
        <MacroBars protein={recipe.protein} carbs={recipe.carbs} fat={recipe.fat} />
        {showMatch && (
          <div className="mt-2 flex flex-wrap gap-2">
            {recipe.matched_ingredients?.map((i) => (
              <span key={i.ingredient_id} className="font-body text-base bg-sand-100 text-sand-700 border border-sand-300 px-3 py-1 rounded-full">
                {i.ingredient_name}
              </span>
            ))}
            {recipe.missing_ingredients?.map((i) => (
              <span key={i.ingredient_id} className="font-body text-base bg-sand-50 text-sand-400 border border-sand-200 px-3 py-1 rounded-full">
                {i.ingredient_name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
