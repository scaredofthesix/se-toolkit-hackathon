import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', goal: 'healthy', level: 'beginner' })
  const [error, setError] = useState('')

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await register(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16 fade-in">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-3xl font-extrabold text-gray-800">Create account</h1>
        <p className="text-gray-500 mt-1">Start your nutrition journey</p>
      </div>
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-4">
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-xl text-sm font-medium">{error}</div>
        )}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Name</label>
          <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} required
            className="w-full bg-white/80 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-400 focus:border-transparent focus:outline-none transition" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
          <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required
            className="w-full bg-white/80 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-400 focus:border-transparent focus:outline-none transition" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
          <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} required minLength={6}
            className="w-full bg-white/80 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-400 focus:border-transparent focus:outline-none transition" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Goal</label>
            <select value={form.goal} onChange={(e) => update('goal', e.target.value)}
              className="w-full bg-white/80 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-400 focus:border-transparent focus:outline-none transition">
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
              <option value="healthy">Healthy Eating</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Level</label>
            <select value={form.level} onChange={(e) => update('level', e.target.value)}
              className="w-full bg-white/80 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-400 focus:border-transparent focus:outline-none transition">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-primary-500 to-emerald-500 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-primary-200 transition-all">
          Sign Up
        </button>
        <p className="text-sm text-gray-500 text-center">
          Already have an account? <Link to="/login" className="text-primary-600 font-semibold hover:underline">Login</Link>
        </p>
      </form>
    </div>
  )
}
