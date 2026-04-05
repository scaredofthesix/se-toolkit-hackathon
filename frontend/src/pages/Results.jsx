import { useLocation, Link } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'

export default function Results() {
  const location = useLocation()
  const recipes = location.state?.recipes || []

  const withMatches = recipes.filter((r) => r.match_percentage > 0)
  const noMatches = recipes.filter((r) => r.match_percentage === 0)

  const buySuggestions = noMatches.slice(0, 6).map((r) => ({
    recipe: r,
    toBuy: r.missing_ingredients?.slice(0, 3) || [],
  }))

  if (recipes.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center fade-in">
        <div className="glass rounded-3xl p-12">
          <div className="text-7xl mb-6">😔</div>
          <h1 className="text-3xl font-extrabold text-gray-800 mb-3">No recipes found</h1>
          <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
            We couldn't find any recipes for your goal and level. Try changing your filters or adding different ingredients.
          </p>
          <Link
            to="/ingredients"
            className="inline-block bg-gradient-to-r from-primary-500 to-emerald-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-primary-200 transition-all"
          >
            Try different ingredients
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            {withMatches.length > 0 ? (
              <>Found <span className="gradient-text">{withMatches.length} recipe{withMatches.length !== 1 ? 's' : ''}</span></>
            ) : (
              'Recipe Results'
            )}
          </h1>
          <p className="text-gray-500 mt-1">Sorted by ingredient match</p>
        </div>
        <Link to="/ingredients" className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center gap-1 transition">
          ← Change ingredients
        </Link>
      </div>

      {/* Recipes with matches */}
      {withMatches.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {withMatches.map((r) => (
            <RecipeCard key={r.id} recipe={r} showMatch />
          ))}
        </div>
      )}

      {/* Zero match section */}
      {withMatches.length === 0 && (
        <div className="glass rounded-3xl p-10 text-center mb-12">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-3">
            You can't cook anything with these ingredients yet
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Your current ingredients don't match any recipes for this goal and level.
            But don't worry — here's what you can buy to unlock some great dishes!
          </p>
        </div>
      )}

      {/* Buy suggestions — clickable cards */}
      {buySuggestions.length > 0 && withMatches.length === 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-700 mb-5 flex items-center gap-2">
            🛍 Buy these to unlock recipes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {buySuggestions.map(({ recipe, toBuy }) => (
              <Link
                key={recipe.id}
                to={`/recipe/${recipe.id}`}
                state={{ recipe }}
                className="glass rounded-2xl overflow-hidden card-hover block"
              >
                <div className="relative">
                  <img
                    src={recipe.image_url || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400'}
                    alt={recipe.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-2 left-2 flex gap-1.5 text-white text-xs">
                    <span className="bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">🔥 {recipe.calories} cal</span>
                    <span className="bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">⏱ {recipe.cook_time} min</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 mb-2">{recipe.title}</h3>
                  <p className="text-xs font-semibold text-gray-500 mb-2">You need to buy:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {toBuy.map((i) => (
                      <span key={i.ingredient_id} className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full font-medium">
                        🛒 {i.ingredient_name}
                      </span>
                    ))}
                    {recipe.missing_ingredients && recipe.missing_ingredients.length > 3 && (
                      <span className="text-xs text-gray-400 px-2 py-1">+{recipe.missing_ingredients.length - 3} more</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* No-match recipes when some matches exist */}
      {withMatches.length > 0 && noMatches.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-2 flex items-center gap-2">
            🛍 Need more ingredients? Try these
          </h2>
          <p className="text-gray-400 text-sm mb-5">Buy a few items and unlock these recipes</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {noMatches.slice(0, 6).map((r) => (
              <Link
                key={r.id}
                to={`/recipe/${r.id}`}
                state={{ recipe: r }}
                className="glass rounded-2xl overflow-hidden card-hover block opacity-80 hover:opacity-100"
              >
                <img src={r.image_url} alt={r.title} className="w-full h-36 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-gray-700 text-sm mb-2">{r.title}</h3>
                  <div className="flex flex-wrap gap-1">
                    {r.missing_ingredients?.slice(0, 4).map((i) => (
                      <span key={i.ingredient_id} className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">
                        🛒 {i.ingredient_name}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
