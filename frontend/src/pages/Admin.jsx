import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import api from '../api/client'

const goalLabels = { weight_loss: 'Weight Loss', muscle_gain: 'Muscle Gain', maintenance: 'Maintenance', healthy: 'Healthy Eating' }
const levelLabels = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }

export default function Admin() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [denied, setDenied] = useState(false)

  if (!user || user.email !== 'bodulevmax@gmail.com') {
    return <Navigate to="/" replace />
  }

  useEffect(() => {
    api.get('/admin/users')
      .then((res) => setUsers(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">
          <span className="gradient-text">Registered Users</span>
        </h1>
        <p className="text-gray-500 mt-1">{users.length} user{users.length !== 1 ? 's' : ''} total</p>
      </div>

      {loading ? (
        <div className="glass rounded-2xl p-8 text-center">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : users.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center text-gray-400">No users registered yet.</div>
      ) : (
        <div className="space-y-3">
          {users.map((u, idx) => (
            <div key={u.id} className="glass rounded-2xl p-5 flex items-center gap-4 card-hover">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-400 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                {u.name?.[0]?.toUpperCase() || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-800 truncate">{u.name}</h3>
                  <span className="text-xs text-gray-400">#{u.id}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{u.email}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {u.goal && (
                  <span className="text-xs bg-primary-50 text-primary-700 border border-primary-200 px-2.5 py-1 rounded-full font-medium">
                    {goalLabels[u.goal] || u.goal}
                  </span>
                )}
                {u.level && (
                  <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full font-medium">
                    {levelLabels[u.level] || u.level}
                  </span>
                )}
                {u.daily_calorie_target && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                    🔥 {u.daily_calorie_target} cal
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
