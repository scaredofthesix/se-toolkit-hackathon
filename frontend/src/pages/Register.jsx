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
    <div className="max-w-lg mx-auto px-10 py-20 fade-in">
      <div className="text-center mb-12">
        <p className="font-body italic text-sand-500 text-2xl mb-4">join us</p>
        <h1 className="font-display text-6xl font-bold text-sand-900">Create Account</h1>
      </div>
      <form onSubmit={handleSubmit} className="card rounded-2xl p-10 space-y-5">
        {error && (
          <div className="bg-sand-100 border border-sand-400 text-sand-800 px-5 py-3 rounded-xl font-body text-lg">{error}</div>
        )}
        <div>
          <label className="block font-body text-lg font-semibold text-sand-700 mb-2">Name</label>
          <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} required
            className="w-full input-field rounded-xl px-5 py-4 font-body text-xl" />
        </div>
        <div>
          <label className="block font-body text-lg font-semibold text-sand-700 mb-2">Email</label>
          <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required
            className="w-full input-field rounded-xl px-5 py-4 font-body text-xl" />
        </div>
        <div>
          <label className="block font-body text-lg font-semibold text-sand-700 mb-2">Password</label>
          <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} required minLength={6}
            className="w-full input-field rounded-xl px-5 py-4 font-body text-xl" />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block font-body text-lg font-semibold text-sand-700 mb-2">Goal</label>
            <select value={form.goal} onChange={(e) => update('goal', e.target.value)}
              className="w-full input-field rounded-xl px-5 py-4 font-body text-xl">
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
              <option value="healthy">Healthy Eating</option>
            </select>
          </div>
          <div>
            <label className="block font-body text-lg font-semibold text-sand-700 mb-2">Level</label>
            <select value={form.level} onChange={(e) => update('level', e.target.value)}
              className="w-full input-field rounded-xl px-5 py-4 font-body text-xl">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
        <button type="submit" className="w-full btn-primary py-4 rounded-xl font-body text-xl font-bold">
          Sign Up
        </button>
        <p className="font-body text-lg text-sand-500 text-center">
          Already have an account? <Link to="/login" className="text-sand-900 font-semibold hover:underline">Login</Link>
        </p>
      </form>
    </div>
  )
}
