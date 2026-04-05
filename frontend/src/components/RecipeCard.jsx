import { Link } from 'react-router-dom'
import MacroBars from './MacroBars'

const diffStyles = {
  easy: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
  medium: 'bg-amber-500/10 text-amber-600 border-amber-200',
  hard: 'bg-rose-500/10 text-rose-600 border-rose-200',
}

export default function RecipeCard({ recipe, showMatch = false }) {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      state={{ recipe }}
      className="glass rounded-2xl card-hover overflow-hidden flex flex-col group"
    >
      <div className="relative overflow-hidden">
        <img
          src={recipe.image_url || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400'}
          alt={recipe.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {showMatch && (
          <div className={`absolute top-3 right-3 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${
            recipe.match_percentage >= 50 ? 'bg-gradient-to-r from-emerald-500 to-green-500' :
            recipe.match_percentage > 0 ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
            'bg-gradient-to-r from-gray-500 to-gray-600'
          }`}>
            {recipe.match_percentage}% match
          </div>
        )}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${diffStyles[recipe.difficulty] || ''}`}>
          {recipe.difficulty}
        </span>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white text-xs font-medium">
          <span className="bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">⏱ {recipe.cook_time} min</span>
          <span className="bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">🔥 {recipe.calories} cal</span>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col gap-3">
        <h3 className="font-bold text-gray-800 text-lg leading-tight">{recipe.title}</h3>
        <MacroBars protein={recipe.protein} carbs={recipe.carbs} fat={recipe.fat} />
        {showMatch && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {recipe.matched_ingredients?.map((i) => (
              <span key={i.ingredient_id} className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                {i.ingredient_name}
              </span>
            ))}
            {recipe.missing_ingredients?.map((i) => (
              <span key={i.ingredient_id} className="text-xs bg-rose-50 text-rose-600 border border-rose-200 px-2 py-0.5 rounded-full font-medium">
                {i.ingredient_name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
