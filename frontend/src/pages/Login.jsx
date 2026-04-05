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
    <div className="max-w-md mx-auto px-6 py-20 fade-in">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">👋</div>
        <h1 className="text-3xl font-extrabold text-gray-800">Welcome back</h1>
        <p className="text-gray-500 mt-1">Sign in to your account</p>
      </div>
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-xl text-sm font-medium">{error}</div>
        )}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full bg-white/80 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-400 focus:border-transparent focus:outline-none transition" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="w-full bg-white/80 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-400 focus:border-transparent focus:outline-none transition" />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-primary-500 to-emerald-500 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-primary-200 transition-all">
          Login
        </button>
        <p className="text-sm text-gray-500 text-center">
          Don't have an account? <Link to="/register" className="text-primary-600 font-semibold hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  )
}
