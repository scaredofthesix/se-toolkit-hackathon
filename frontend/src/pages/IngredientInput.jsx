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
    <div className="max-w-2xl mx-auto px-8 py-24 fade-in">
      <div className="text-center mb-14">
        <p className="font-body italic text-sand-500 text-xl mb-3">type what you have</p>
        <h1 className="font-display text-6xl font-bold text-sand-900 leading-tight">
          Your <span className="italic font-normal">Kitchen</span>
        </h1>
      </div>

      <div className="relative mb-4" ref={dropdownRef}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ingredients..."
          className="w-full input-field rounded-xl px-6 py-4 font-body text-xl placeholder:text-sand-400"
        />
        {suggestions.length > 0 && (
          <div className="absolute z-20 w-full card rounded-xl mt-2 shadow-xl max-h-64 overflow-y-auto">
            {suggestions.map((s) => (
              <button
                key={s.id}
                onClick={() => addIngredient(s)}
                className="w-full text-left px-6 py-3.5 hover:bg-sand-100/60 transition flex items-center justify-between font-body text-lg first:rounded-t-xl last:rounded-b-xl"
              >
                <span className="text-sand-900">{s.name}</span>
                <span className="text-sm text-sand-400 bg-sand-100 px-3 py-0.5 rounded-full">{s.category}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selected.map((s) => (
            <span
              key={s.id}
              className="bg-sand-100 text-sand-800 border border-sand-300 px-4 py-2 rounded-full font-body text-base font-semibold flex items-center gap-2"
            >
              {s.name}
              <button onClick={() => removeIngredient(s.id)} className="w-5 h-5 rounded-full bg-sand-300/50 hover:bg-sand-400/50 text-sand-700 flex items-center justify-center transition text-xs font-bold">&times;</button>
            </span>
          ))}
        </div>
      )}

      <div className="mt-8">
        <button
          onClick={findRecipes}
          disabled={selected.length === 0 || loading}
          className="w-full btn-primary py-4 rounded-xl font-body text-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {loading ? 'Searching...' : `Find Recipes (${selected.length})`}
        </button>
      </div>
    </div>
  )
}
