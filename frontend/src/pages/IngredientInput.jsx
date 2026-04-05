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

  return (
    <div className="max-w-3xl mx-auto px-10 py-24 fade-in">
      <div className="text-center mb-16">
        <p className="font-body italic text-white/50 text-2xl mb-4">type what you have</p>
        <h1 className="font-display text-[clamp(3rem,6vw,5rem)] font-bold leading-tight">
          Your Kitchen
        </h1>
      </div>

      {/* Search — dropdown is inside a relative container with high z-index */}
      <div className="relative z-20 mb-5" ref={dropdownRef}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ingredients..."
          className="w-full input-field rounded-none px-7 py-5 font-body text-2xl"
        />
        {suggestions.length > 0 && (
          <div className="absolute left-0 right-0 mt-1 bg-dark-400 border border-white/10 max-h-72 overflow-y-auto shadow-2xl">
            {suggestions.map((s) => (
              <button
                key={s.id}
                onClick={() => addIngredient(s)}
                className="w-full text-left px-7 py-4 hover:bg-white/[0.06] transition flex items-center justify-between font-body text-xl border-b border-white/[0.04] last:border-b-0"
              >
                <span className="text-white/90">{s.name}</span>
                <span className="text-sm text-white/35 bg-white/[0.06] px-3 py-1">{s.category}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected ingredients */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-8">
          {selected.map((s) => (
            <span
              key={s.id}
              className="bg-white/[0.06] text-white/80 border border-white/10 px-5 py-2.5 font-body text-lg flex items-center gap-2"
            >
              {s.name}
              <button onClick={() => removeIngredient(s.id)} className="w-6 h-6 bg-white/10 hover:bg-white/20 text-white/60 flex items-center justify-center transition text-sm font-bold">&times;</button>
            </span>
          ))}
        </div>
      )}

      {/* Button — z-10 so dropdown doesn't go behind it */}
      <div className="relative z-10 mt-8">
        <button
          onClick={findRecipes}
          disabled={selected.length === 0 || loading}
          className="w-full btn-primary py-5 rounded-none font-body text-sm tracking-[0.14em] uppercase disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {loading ? 'Searching...' : `Find Recipes (${selected.length})`}
        </button>
      </div>
    </div>
  )
}
