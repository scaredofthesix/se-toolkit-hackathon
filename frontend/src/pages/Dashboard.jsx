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
    <div className="max-w-7xl mx-auto px-4 sm:px-10 py-8 sm:py-14 fade-in">
      <div className="mb-8 sm:mb-12">
        <p className="font-body italic text-white/50 text-lg sm:text-2xl mb-2">welcome back</p>
        <h1 className="font-display text-3xl sm:text-5xl font-bold">
          {user?.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-7 mb-10">
        {/* Today's calories */}
        <div className="card rounded-2xl p-5 sm:p-8">
          <h2 className="font-display font-bold text-xl sm:text-2xl mb-5">Today's Calories</h2>
          {today ? (
            <>
              <div className="flex justify-between font-body text-base sm:text-lg text-white/50 mb-3">
                <span className="font-semibold text-white text-lg sm:text-xl">{today.total_calories} cal</span>
                <span>/ {today.daily_target} cal target</span>
              </div>
              <div className="w-full bg-white/[0.08] rounded-full h-4 overflow-hidden">
                <div
                  className="h-4 rounded-full transition-all duration-700 bg-white"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="font-body text-sm sm:text-base text-white/40 mt-2">{Math.round(pct)}% of daily target</p>
              {today.meals.length > 0 && (
                <div className="mt-5 space-y-2">
                  {today.meals.map((m) => (
                    <div key={m.id} className="flex justify-between font-body text-base sm:text-lg bg-white/[0.04] rounded-lg px-4 sm:px-5 py-3">
                      <span className="text-white/80">{m.recipe_title}</span>
                      <span className="text-white/50">{m.total_calories} cal</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="h-24 bg-white/[0.04] rounded-xl animate-pulse" />
          )}
        </div>

        {/* Weekly chart */}
        <div className="card rounded-2xl p-5 sm:p-8">
          <h2 className="font-display font-bold text-xl sm:text-2xl mb-5">This Week</h2>
          {weekData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weekData}>
                <XAxis dataKey="date" tick={{ fontSize: 14, fill: 'rgba(255,255,255,0.45)', fontFamily: 'Crimson Pro' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 14, fill: 'rgba(255,255,255,0.45)', fontFamily: 'Crimson Pro' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: '#1a1a1a', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', fontFamily: 'Crimson Pro', fontSize: '16px', color: '#fff' }} />
                <Bar dataKey="calories" fill="#fff" radius={[4, 4, 0, 0]} />
                {week?.daily_target && <ReferenceLine y={week.daily_target} stroke="rgba(255,255,255,0.3)" strokeDasharray="4 4" label={{ value: 'Target', position: 'right', fill: 'rgba(255,255,255,0.4)', fontSize: 14, fontFamily: 'Crimson Pro' }} />}
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-52 flex items-center justify-center font-body text-white/40 text-lg sm:text-xl italic">No data yet — log some meals!</div>
          )}
        </div>
      </div>

      {/* Shopping list */}
      {shopping.length > 0 && (
        <div className="card rounded-2xl p-5 sm:p-8 mb-10">
          <h2 className="font-display font-bold text-xl sm:text-2xl mb-5">Shopping List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {shopping.map((item) => (
              <label key={item.id} className="flex items-center gap-4 cursor-pointer bg-white/[0.03] hover:bg-white/[0.06] rounded-xl px-4 sm:px-5 py-3 sm:py-4 transition font-body text-base sm:text-xl">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheck(item.id)}
                  className="w-5 h-5 rounded"
                />
                <span className={item.checked ? 'line-through text-white/30' : 'text-white/80'}>
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
          <h2 className="font-display font-bold text-xl sm:text-2xl mb-5">Favorites</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {favorites.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </div>
      ) : (
        <div className="card rounded-2xl p-8 sm:p-10 text-center">
          <p className="font-body text-white/40 text-lg sm:text-xl">
            No favorites yet. <Link to="/goals" className="text-white font-semibold hover:underline">Find recipes</Link> and save your favorites!
          </p>
        </div>
      )}
    </div>
  )
}
