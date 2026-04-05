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
    <div className="max-w-md mx-auto px-8 py-24 fade-in">
      <div className="text-center mb-10">
        <p className="font-body italic text-sand-500 text-xl mb-3">welcome back</p>
        <h1 className="font-display text-5xl font-bold text-sand-900">Sign In</h1>
      </div>
      <form onSubmit={handleSubmit} className="card rounded-2xl p-8 space-y-5">
        {error && (
          <div className="bg-sand-100 border border-sand-400 text-sand-800 px-4 py-3 rounded-xl font-body text-base">{error}</div>
        )}
        <div>
          <label className="block font-body text-base font-semibold text-sand-700 mb-1.5">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full input-field rounded-xl px-4 py-3 font-body text-lg" />
        </div>
        <div>
          <label className="block font-body text-base font-semibold text-sand-700 mb-1.5">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="w-full input-field rounded-xl px-4 py-3 font-body text-lg" />
        </div>
        <button type="submit" className="w-full btn-primary py-3 rounded-xl font-body text-lg font-bold">
          Login
        </button>
        <p className="font-body text-base text-sand-500 text-center">
          Don't have an account? <Link to="/register" className="text-sand-900 font-semibold hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  )
}
