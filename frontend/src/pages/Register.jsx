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
    <div className="max-w-md mx-auto px-8 py-20 fade-in">
      <div className="text-center mb-10">
        <p className="font-body italic text-sand-500 text-xl mb-3">join us</p>
        <h1 className="font-display text-5xl font-bold text-sand-900">Create Account</h1>
      </div>
      <form onSubmit={handleSubmit} className="card rounded-2xl p-8 space-y-4">
        {error && (
          <div className="bg-sand-100 border border-sand-400 text-sand-800 px-4 py-3 rounded-xl font-body text-base">{error}</div>
        )}
        <div>
          <label className="block font-body text-base font-semibold text-sand-700 mb-1.5">Name</label>
          <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} required
            className="w-full input-field rounded-xl px-4 py-3 font-body text-lg" />
        </div>
        <div>
          <label className="block font-body text-base font-semibold text-sand-700 mb-1.5">Email</label>
          <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required
            className="w-full input-field rounded-xl px-4 py-3 font-body text-lg" />
        </div>
        <div>
          <label className="block font-body text-base font-semibold text-sand-700 mb-1.5">Password</label>
          <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} required minLength={6}
            className="w-full input-field rounded-xl px-4 py-3 font-body text-lg" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-body text-base font-semibold text-sand-700 mb-1.5">Goal</label>
            <select value={form.goal} onChange={(e) => update('goal', e.target.value)}
              className="w-full input-field rounded-xl px-4 py-3 font-body text-lg">
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
              <option value="healthy">Healthy Eating</option>
            </select>
          </div>
          <div>
            <label className="block font-body text-base font-semibold text-sand-700 mb-1.5">Level</label>
            <select value={form.level} onChange={(e) => update('level', e.target.value)}
              className="w-full input-field rounded-xl px-4 py-3 font-body text-lg">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
        <button type="submit" className="w-full btn-primary py-3 rounded-xl font-body text-lg font-bold">
          Sign Up
        </button>
        <p className="font-body text-base text-sand-500 text-center">
          Already have an account? <Link to="/login" className="text-sand-900 font-semibold hover:underline">Login</Link>
        </p>
      </form>
    </div>
  )
}
