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
    <div className="max-w-6xl mx-auto px-8 py-12 fade-in">
      <div className="mb-10">
        <p className="font-body italic text-sand-500 text-xl mb-1">welcome back</p>
        <h1 className="font-display text-4xl font-bold text-sand-900">
          {user?.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Today's calories */}
        <div className="card rounded-2xl p-6">
          <h2 className="font-display font-bold text-sand-800 text-lg mb-4">Today's Calories</h2>
          {today ? (
            <>
              <div className="flex justify-between font-body text-base text-sand-500 mb-2">
                <span className="font-semibold text-sand-800">{today.total_calories} cal</span>
                <span>/ {today.daily_target} cal target</span>
              </div>
              <div className="w-full bg-sand-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-700 ${pct > 90 ? 'bg-sand-600' : 'bg-sand-800'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="font-body text-sm text-sand-400 mt-2">{Math.round(pct)}% of daily target</p>
              {today.meals.length > 0 && (
                <div className="mt-4 space-y-2">
                  {today.meals.map((m) => (
                    <div key={m.id} className="flex justify-between font-body text-base bg-sand-100/50 rounded-lg px-4 py-2">
                      <span className="text-sand-800">{m.recipe_title}</span>
                      <span className="text-sand-500">{m.total_calories} cal</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="h-20 bg-sand-100/50 rounded-xl animate-pulse" />
          )}
        </div>

        {/* Weekly chart */}
        <div className="card rounded-2xl p-6">
          <h2 className="font-display font-bold text-sand-800 text-lg mb-4">This Week</h2>
          {weekData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weekData}>
                <XAxis dataKey="date" tick={{ fontSize: 13, fill: '#9c8e7e', fontFamily: 'Cormorant Garamond' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 13, fill: '#9c8e7e', fontFamily: 'Cormorant Garamond' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #d4c4b5', boxShadow: '0 8px 32px rgba(0,0,0,0.06)', fontFamily: 'Cormorant Garamond' }} />
                <Bar dataKey="calories" fill="#3a3430" radius={[4, 4, 0, 0]} />
                {week?.daily_target && <ReferenceLine y={week.daily_target} stroke="#b8a999" strokeDasharray="4 4" label={{ value: 'Target', position: 'right', fill: '#b8a999', fontSize: 13, fontFamily: 'Cormorant Garamond' }} />}
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center font-body text-sand-400 text-lg italic">No data yet — log some meals!</div>
          )}
        </div>
      </div>

      {/* Shopping list */}
      {shopping.length > 0 && (
        <div className="card rounded-2xl p-6 mb-8">
          <h2 className="font-display font-bold text-sand-800 text-lg mb-4">Shopping List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {shopping.map((item) => (
              <label key={item.id} className="flex items-center gap-3 cursor-pointer bg-sand-100/30 hover:bg-sand-100/60 rounded-xl px-4 py-3 transition font-body text-lg">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheck(item.id)}
                  className="w-5 h-5 accent-sand-800 rounded"
                />
                <span className={item.checked ? 'line-through text-sand-400' : 'text-sand-800'}>
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
          <h2 className="font-display font-bold text-sand-800 text-lg mb-4">Favorites</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </div>
      ) : (
        <div className="card rounded-2xl p-8 text-center">
          <p className="font-body text-sand-400 text-lg">
            No favorites yet. <Link to="/" className="text-sand-900 font-semibold hover:underline">Find recipes</Link> and save your favorites!
          </p>
        </div>
      )}
    </div>
  )
}
