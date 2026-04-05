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
    <div className="max-w-4xl mx-auto px-8 py-12 fade-in">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold text-sand-900">
          Registered <span className="italic font-normal">Users</span>
        </h1>
        <p className="font-body text-sand-500 text-lg mt-1">{users.length} user{users.length !== 1 ? 's' : ''} total</p>
      </div>

      {loading ? (
        <div className="card rounded-2xl p-10 text-center">
          <div className="w-8 h-8 border-2 border-sand-800 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : users.length === 0 ? (
        <div className="card rounded-2xl p-10 text-center font-body text-sand-400 text-lg">No users registered yet.</div>
      ) : (
        <div className="space-y-3">
          {users.map((u) => (
            <div key={u.id} className="card rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-sand-800 flex items-center justify-center text-sand-100 font-display font-bold text-lg flex-shrink-0">
                {u.name?.[0]?.toUpperCase() || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-sand-900 truncate">{u.name}</h3>
                  <span className="font-body text-sm text-sand-400">#{u.id}</span>
                </div>
                <p className="font-body text-base text-sand-500 truncate">{u.email}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {u.goal && (
                  <span className="font-body text-sm bg-sand-100 text-sand-700 border border-sand-300 px-3 py-1 rounded-full">
                    {goalLabels[u.goal] || u.goal}
                  </span>
                )}
                {u.level && (
                  <span className="font-body text-sm bg-sand-100 text-sand-700 border border-sand-300 px-3 py-1 rounded-full">
                    {levelLabels[u.level] || u.level}
                  </span>
                )}
                {u.daily_calorie_target && (
                  <span className="font-body text-sm bg-sand-100 text-sand-600 px-3 py-1 rounded-full">
                    {u.daily_calorie_target} cal
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
