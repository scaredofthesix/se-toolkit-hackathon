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
      <div className="max-w-3xl mx-auto px-4 sm:px-10 py-16 sm:py-24 text-center fade-in">
        <div className="card rounded-2xl p-10 sm:p-16">
          <h1 className="font-display text-3xl sm:text-5xl font-bold mb-5">No recipes found</h1>
          <p className="font-body text-white/55 text-lg sm:text-2xl mb-10 max-w-lg mx-auto">
            We couldn't find any recipes for your goal and level. Try changing your filters or adding different ingredients.
          </p>
          <Link
            to="/ingredients"
            className="inline-block btn-primary px-10 py-4 rounded-full font-body text-lg sm:text-xl font-semibold"
          >
            Try different ingredients
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-10 py-8 sm:py-14 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-12 gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold">
            {withMatches.length > 0 ? (
              <>Found <span className="italic font-normal">{withMatches.length} recipe{withMatches.length !== 1 ? 's' : ''}</span></>
            ) : (
              'Recipe Results'
            )}
          </h1>
          <p className="font-body text-white/50 text-lg sm:text-xl mt-2">Sorted by ingredient match</p>
        </div>
        <Link to="/ingredients" className="btn-secondary px-6 py-2.5 rounded-full font-body text-base sm:text-lg self-start">
          Change ingredients
        </Link>
      </div>

      {withMatches.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 mb-16">
          {withMatches.map((r) => (
            <RecipeCard key={r.id} recipe={r} showMatch />
          ))}
        </div>
      )}

      {withMatches.length === 0 && (
        <div className="card rounded-2xl p-8 sm:p-14 text-center mb-16">
          <h2 className="font-display text-2xl sm:text-4xl font-bold mb-4">
            No matches with these ingredients
          </h2>
          <p className="font-body text-white/50 text-lg sm:text-xl max-w-lg mx-auto">
            Your current ingredients don't match any recipes. Here's what you can buy to unlock some great dishes.
          </p>
        </div>
      )}

      {buySuggestions.length > 0 && withMatches.length === 0 && (
        <div className="mb-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">
            Buy these to unlock recipes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {buySuggestions.map(({ recipe, toBuy }) => (
              <Link
                key={recipe.id}
                to={`/recipe/${recipe.id}`}
                state={{ recipe }}
                className="card rounded-2xl overflow-hidden block"
              >
                <img
                  src={recipe.image_url || '/static/images/01_grilled_chicken_spinach_salad.jpg'}
                  alt={recipe.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4 sm:p-6">
                  <h3 className="font-display font-bold text-lg mb-3">{recipe.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {toBuy.map((i) => (
                      <span key={i.ingredient_id} className="font-body text-sm bg-white/[0.06] text-white/60 border border-white/10 px-3 py-1 rounded-full">
                        {i.ingredient_name}
                      </span>
                    ))}
                    {recipe.missing_ingredients && recipe.missing_ingredients.length > 3 && (
                      <span className="font-body text-sm text-white/40 px-2 py-1">+{recipe.missing_ingredients.length - 3} more</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {withMatches.length > 0 && noMatches.length > 0 && (
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
            Need more ingredients?
          </h2>
          <p className="font-body text-white/40 text-lg sm:text-xl mb-6">Buy a few items and unlock these recipes</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {noMatches.slice(0, 6).map((r) => (
              <Link
                key={r.id}
                to={`/recipe/${r.id}`}
                state={{ recipe: r }}
                className="card rounded-2xl overflow-hidden block opacity-70 hover:opacity-100"
              >
                <img src={r.image_url} alt={r.title} className="w-full h-40 object-cover" />
                <div className="p-4 sm:p-5">
                  <h3 className="font-display font-bold mb-2">{r.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {r.missing_ingredients?.slice(0, 4).map((i) => (
                      <span key={i.ingredient_id} className="font-body text-sm bg-white/[0.06] text-white/60 px-3 py-0.5 rounded-full">
                        {i.ingredient_name}
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
