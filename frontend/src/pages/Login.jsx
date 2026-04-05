import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="max-w-lg mx-auto px-10 py-24 fade-in">
      <div className="text-center mb-12">
        <p className="font-body italic text-sand-500 text-2xl mb-4">welcome back</p>
        <h1 className="font-display text-6xl font-bold text-sand-900">Sign In</h1>
      </div>
      <form onSubmit={handleSubmit} className="card rounded-2xl p-10 space-y-6">
        {error && (
          <div className="bg-sand-100 border border-sand-400 text-sand-800 px-5 py-3 rounded-xl font-body text-lg">{error}</div>
        )}
        <div>
          <label className="block font-body text-lg font-semibold text-sand-700 mb-2">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full input-field rounded-xl px-5 py-4 font-body text-xl" />
        </div>
        <div>
          <label className="block font-body text-lg font-semibold text-sand-700 mb-2">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="w-full input-field rounded-xl px-5 py-4 font-body text-xl" />
        </div>
        <button type="submit" className="w-full btn-primary py-4 rounded-xl font-body text-xl font-bold">
          Login
        </button>
        <p className="font-body text-lg text-sand-500 text-center">
          Don't have an account? <Link to="/register" className="text-sand-900 font-semibold hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  )
}
