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
    // Always fetch full recipe from API to get instructions
    api.get(`/recipes/${id}`).then((res) => {
      setFullRecipe(res.data)
    }).catch(() => {})
  }, [id])

  // Merge: use state recipe for match data, full recipe for instructions etc
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
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <div className="glass rounded-3xl p-12">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-400 mt-4">Loading recipe...</p>
      </div>
    </div>
  )

  // Parse instructions into steps
  const steps = r.instructions
    ? r.instructions.split('\n').filter((s) => s.trim())
    : []

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 fade-in">
      {/* Hero image */}
      <div className="relative rounded-3xl overflow-hidden mb-8 shadow-xl">
        <img
          src={r.image_url || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800'}
          alt={r.title}
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-3xl font-extrabold text-white mb-2 drop-shadow-lg">{r.title}</h1>
          <div className="flex items-center gap-3 text-sm text-white/90">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">⏱ {r.cook_time} min</span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full capitalize">{r.difficulty}</span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">🔥 {r.calories} cal</span>
          </div>
        </div>
      </div>

      {/* Nutrition card */}
      <div className="glass rounded-2xl p-6 mb-6">
        <h2 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">📊</span>
          Nutrition per serving
        </h2>
        <MacroBars protein={r.protein} carbs={r.carbs} fat={r.fat} />
      </div>

      {/* Ingredients */}
      {(r.matched_ingredients || r.missing_ingredients) && (
        <div className="glass rounded-2xl p-6 mb-6">
          <h2 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-sm">🥘</span>
            Ingredients
          </h2>
          <div className="flex flex-wrap gap-2">
            {r.matched_ingredients?.map((i) => (
              <span key={i.ingredient_id} className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                {i.ingredient_name} — {i.amount} {i.unit}
              </span>
            ))}
            {r.missing_ingredients?.map((i) => (
              <span key={i.ingredient_id} className="bg-rose-50 text-rose-600 border border-rose-200 px-3.5 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 bg-rose-400 rounded-full" />
                {i.ingredient_name} — {i.amount} {i.unit}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="glass rounded-2xl p-6 mb-6">
        <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-sm">📝</span>
          Instructions
        </h2>
        {steps.length > 0 ? (
          <ol className="space-y-4">
            {steps.map((step, idx) => {
              const text = step.replace(/^\d+\.\s*/, '')
              return (
                <li key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-1">{text}</p>
                </li>
              )
            })}
          </ol>
        ) : (
          <p className="text-gray-400 italic">Instructions are loading...</p>
        )}
      </div>

      {/* Action buttons */}
      {user && (
        <div className="flex gap-3 flex-wrap mb-4">
          <button onClick={logMeal} className="bg-gradient-to-r from-primary-500 to-emerald-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-200 transition-all flex items-center gap-2">
            <span>📋</span> Log this meal
          </button>
          <button onClick={toggleFav} className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-200 transition-all flex items-center gap-2">
            <span>⭐</span> Favorite
          </button>
          <button onClick={addToShoppingList} className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all flex items-center gap-2">
            <span>🛒</span> Add to shopping list
          </button>
        </div>
      )}

      {!user && (
        <div className="glass rounded-2xl p-5 text-center text-gray-500 text-sm mb-4">
          <a href="/login" className="text-primary-600 font-semibold hover:underline">Login</a> to log meals, save favorites, and manage your shopping list.
        </div>
      )}

      {message && (
        <div className="glass rounded-xl bg-primary-50/80 border border-primary-200 text-primary-700 px-5 py-3 font-medium text-sm fade-in">
          {message}
        </div>
      )}
    </div>
  )
}
