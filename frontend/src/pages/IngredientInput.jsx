import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../api/client'

export default function IngredientInput() {
  const navigate = useNavigate()
  const location = useLocation()
  const goal = location.state?.goal || 'healthy'
  const level = location.state?.level || 'beginner'

  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (query.length < 1) { setSuggestions([]); return }
    const timer = setTimeout(() => {
      api.get(`/ingredients?search=${encodeURIComponent(query)}`)
        .then((res) => setSuggestions(res.data.filter((s) => !selected.find((sel) => sel.id === s.id))))
        .catch(() => {})
    }, 200)
    return () => clearTimeout(timer)
  }, [query, selected])

  // Close dropdown on click outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSuggestions([])
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const addIngredient = (ing) => {
    setSelected((prev) => [...prev, ing])
    setQuery('')
    setSuggestions([])
  }

  const removeIngredient = (id) => {
    setSelected((prev) => prev.filter((i) => i.id !== id))
  }

  const findRecipes = async () => {
    if (selected.length === 0) return
    setLoading(true)
    try {
      const res = await api.post('/recipes/match', {
        ingredient_ids: selected.map((i) => i.id),
        goal,
        level,
      })
      navigate('/results', { state: { recipes: res.data, goal, level, selectedIngredients: selected } })
    } catch {
      alert('Error fetching recipes')
    } finally {
      setLoading(false)
    }
  }

  const categoryIcons = { meat: '🥩', dairy: '🧀', vegetable: '🥬', grain: '🌾', fruit: '🍎', spice: '🧂', pantry: '🫙' }

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
          What's in your <span className="gradient-text">kitchen</span>?
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto">Type ingredient names and we'll find the best recipes.</p>
      </div>

      {/* Search + dropdown wrapper */}
      <div className="relative mb-4" ref={dropdownRef}>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ingredients... (chicken, rice, tomato)"
          className="w-full glass-strong rounded-2xl pl-12 pr-4 py-4 text-lg focus:ring-2 focus:ring-primary-400 focus:outline-none transition shadow-sm"
        />
        {suggestions.length > 0 && (
          <div className="absolute z-20 w-full glass-strong rounded-2xl mt-2 shadow-xl max-h-64 overflow-y-auto">
            {suggestions.map((s) => (
              <button
                key={s.id}
                onClick={() => addIngredient(s)}
                className="w-full text-left px-5 py-3.5 hover:bg-primary-50/70 transition flex items-center justify-between first:rounded-t-2xl last:rounded-b-2xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{categoryIcons[s.category] || '🍽'}</span>
                  <span className="text-gray-800 font-medium">{s.name}</span>
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{s.category}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected ingredients */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selected.map((s) => (
            <span
              key={s.id}
              className="bg-gradient-to-r from-primary-50 to-emerald-50 text-primary-700 border border-primary-200 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm"
            >
              <span className="text-base">{categoryIcons[s.category] || '🍽'}</span>
              {s.name}
              <button onClick={() => removeIngredient(s.id)} className="ml-1 w-5 h-5 rounded-full bg-primary-200/50 hover:bg-red-200 text-primary-600 hover:text-red-600 flex items-center justify-center transition text-xs font-bold">&times;</button>
            </span>
          ))}
        </div>
      )}

      {/* Spacer so button is always below dropdown */}
      <div className="mt-6">
        <button
          onClick={findRecipes}
          disabled={selected.length === 0 || loading}
          className="w-full bg-gradient-to-r from-primary-500 to-emerald-500 text-white py-4 rounded-2xl text-lg font-bold hover:shadow-xl hover:shadow-primary-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none btn-glow relative z-10"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              Searching...
            </span>
          ) : `Find Recipes (${selected.length} ingredient${selected.length !== 1 ? 's' : ''})`}
        </button>
      </div>
    </div>
  )
}
