import { useParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'
import MacroBars from '../components/MacroBars'

export default function RecipeDetail() {
  const { id } = useParams()
  const location = useLocation()
  const { user } = useAuth()
  const stateRecipe = location.state?.recipe || null
  const [recipe, setRecipe] = useState(stateRecipe)
  const [fullRecipe, setFullRecipe] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    api.get(`/recipes/${id}`).then((res) => {
      setFullRecipe(res.data)
    }).catch(() => {})
  }, [id])

  const r = fullRecipe ? { ...recipe, ...fullRecipe, matched_ingredients: recipe?.matched_ingredients, missing_ingredients: recipe?.missing_ingredients } : recipe

  const showMsg = (text) => {
    setMessage(text)
    setTimeout(() => setMessage(''), 2500)
  }

  const logMeal = async () => {
    try {
      await api.post('/meals/log', { recipe_id: parseInt(id) })
      showMsg('Meal logged successfully!')
    } catch {
      showMsg('Login required to log meals')
    }
  }

  const toggleFav = async () => {
    try {
      const res = await api.post(`/favorites/${id}`)
      showMsg(res.data.status === 'added' ? 'Added to favorites!' : 'Removed from favorites')
    } catch {
      showMsg('Login required')
    }
  }

  const addToShoppingList = async () => {
    try {
      const res = await api.post(`/shopping-list/generate/${id}`)
      showMsg(`${res.data.added} items added to shopping list!`)
    } catch {
      showMsg('Login required')
    }
  }

  if (!r) return (
    <div className="max-w-3xl mx-auto px-8 py-24 text-center">
      <div className="card rounded-2xl p-14">
        <p className="font-body text-sand-500 text-xl italic">Loading recipe...</p>
      </div>
    </div>
  )

  const steps = r.instructions
    ? r.instructions.split('\n').filter((s) => s.trim())
    : []

  return (
    <div className="max-w-3xl mx-auto px-8 py-12 fade-in">
      {/* Hero image */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <img
          src={r.image_url || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800'}
          alt={r.title}
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="font-display text-4xl font-bold text-white mb-3">{r.title}</h1>
          <div className="flex items-center gap-3 font-body text-sm text-white/90">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">{r.cook_time} min</span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full capitalize">{r.difficulty}</span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">{r.calories} cal</span>
          </div>
        </div>
      </div>

      {/* Nutrition */}
      <div className="card rounded-2xl p-6 mb-5">
        <h2 className="font-display font-bold text-sand-800 text-lg mb-3">Nutrition per serving</h2>
        <MacroBars protein={r.protein} carbs={r.carbs} fat={r.fat} />
      </div>

      {/* Ingredients */}
      {(r.matched_ingredients || r.missing_ingredients) && (
        <div className="card rounded-2xl p-6 mb-5">
          <h2 className="font-display font-bold text-sand-800 text-lg mb-3">Ingredients</h2>
          <div className="flex flex-wrap gap-2">
            {r.matched_ingredients?.map((i) => (
              <span key={i.ingredient_id} className="font-body text-base bg-sand-100 text-sand-800 border border-sand-300 px-4 py-1.5 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 bg-sand-800 rounded-full" />
                {i.ingredient_name} — {i.amount} {i.unit}
              </span>
            ))}
            {r.missing_ingredients?.map((i) => (
              <span key={i.ingredient_id} className="font-body text-base bg-sand-50 text-sand-400 border border-sand-200 px-4 py-1.5 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 bg-sand-300 rounded-full" />
                {i.ingredient_name} — {i.amount} {i.unit}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="card rounded-2xl p-6 mb-5">
        <h2 className="font-display font-bold text-sand-800 text-lg mb-4">Instructions</h2>
        {steps.length > 0 ? (
          <ol className="space-y-4">
            {steps.map((step, idx) => {
              const text = step.replace(/^\d+\.\s*/, '')
              return (
                <li key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-sand-800 rounded-full flex items-center justify-center text-sand-100 font-body text-sm font-bold">
                    {idx + 1}
                  </div>
                  <p className="font-body text-sand-700 text-lg leading-relaxed pt-0.5">{text}</p>
                </li>
              )
            })}
          </ol>
        ) : (
          <p className="font-body text-sand-400 italic text-lg">Instructions are loading...</p>
        )}
      </div>

      {/* Actions */}
      {user && (
        <div className="flex gap-3 flex-wrap mb-4">
          <button onClick={logMeal} className="btn-primary px-6 py-2.5 rounded-xl font-body text-base font-semibold">
            Log this meal
          </button>
          <button onClick={toggleFav} className="btn-secondary px-6 py-2.5 rounded-xl font-body text-base font-semibold">
            Favorite
          </button>
          <button onClick={addToShoppingList} className="btn-secondary px-6 py-2.5 rounded-xl font-body text-base font-semibold">
            Add to shopping list
          </button>
        </div>
      )}

      {!user && (
        <div className="card rounded-2xl p-5 text-center font-body text-sand-500 text-lg mb-4">
          <a href="/login" className="text-sand-900 font-semibold hover:underline">Login</a> to log meals, save favorites, and manage your shopping list.
        </div>
      )}

      {message && (
        <div className="card rounded-xl bg-sand-100 border-sand-300 text-sand-800 px-5 py-3 font-body text-base fade-in">
          {message}
        </div>
      )}
    </div>
  )
}
