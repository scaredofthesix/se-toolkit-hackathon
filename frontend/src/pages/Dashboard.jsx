import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'
import RecipeCard from '../components/RecipeCard'

export default function Dashboard() {
  const { user } = useAuth()
  const [today, setToday] = useState(null)
  const [week, setWeek] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [shopping, setShopping] = useState([])

  useEffect(() => {
    api.get('/meals/today').then((r) => setToday(r.data)).catch(() => {})
    api.get('/meals/week').then((r) => setWeek(r.data)).catch(() => {})
    api.get('/favorites').then((r) => setFavorites(r.data)).catch(() => {})
    api.get('/shopping-list').then((r) => setShopping(r.data)).catch(() => {})
  }, [])

  const weekData = week
    ? Object.entries(week.days).map(([date, cals]) => ({
        date: new Date(date).toLocaleDateString('en', { weekday: 'short' }),
        calories: cals,
      }))
    : []

  const pct = today && today.daily_target ? Math.min((today.total_calories / today.daily_target) * 100, 100) : 0

  const toggleCheck = async (id) => {
    await api.patch(`/shopping-list/${id}`)
    setShopping((prev) => prev.map((s) => s.id === id ? { ...s, checked: !s.checked } : s))
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Welcome back, <span className="gradient-text">{user?.name}</span>
        </h1>
        <p className="text-gray-500 mt-1">Here's your nutrition overview</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Today's calories */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-sm">🔥</span>
            Today's Calories
          </h2>
          {today ? (
            <>
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span className="font-semibold text-gray-700">{today.total_calories} cal</span>
                <span>/ {today.daily_target} cal target</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-4 rounded-full transition-all duration-700 ${
                    pct > 90 ? 'bg-gradient-to-r from-red-400 to-rose-500' : 'bg-gradient-to-r from-primary-400 to-emerald-500'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">{Math.round(pct)}% of daily target</p>
              {today.meals.length > 0 && (
                <div className="mt-4 space-y-2">
                  {today.meals.map((m) => (
                    <div key={m.id} className="flex justify-between text-sm bg-gray-50 rounded-lg px-3 py-2">
                      <span className="text-gray-700 font-medium">{m.recipe_title}</span>
                      <span className="text-gray-500">{m.total_calories} cal</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="h-20 shimmer rounded-xl" />
          )}
        </div>

        {/* Weekly chart */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-sm">📊</span>
            This Week
          </h2>
          {weekData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weekData}>
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="calories" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                </defs>
                {week?.daily_target && <ReferenceLine y={week.daily_target} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Target', position: 'right', fill: '#ef4444', fontSize: 11 }} />}
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No data yet — log some meals!</div>
          )}
        </div>
      </div>

      {/* Shopping list */}
      {shopping.length > 0 && (
        <div className="glass rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">🛒</span>
            Shopping List
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {shopping.map((item) => (
              <label key={item.id} className="flex items-center gap-3 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-xl px-4 py-3 transition">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheck(item.id)}
                  className="w-5 h-5 accent-primary-500 rounded"
                />
                <span className={`font-medium ${item.checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {item.ingredient_name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Favorites */}
      {favorites.length > 0 ? (
        <div>
          <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-sm">⭐</span>
            Favorites
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </div>
      ) : (
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-gray-400">
            No favorites yet. <Link to="/" className="text-primary-600 font-semibold hover:underline">Find recipes</Link> and save your favorites!
          </p>
        </div>
      )}
    </div>
  )
}
