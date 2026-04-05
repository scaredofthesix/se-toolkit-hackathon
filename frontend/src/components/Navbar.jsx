import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="glass-strong sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="text-3xl group-hover:scale-110 transition-transform">🥗</span>
          <span className="text-2xl font-extrabold gradient-text">WhatToEat</span>
        </Link>
        <div className="flex items-center gap-5">
          {user ? (
            <>
              <Link to="/ingredients" className="text-gray-600 hover:text-primary-600 font-medium transition text-sm">
                Find Recipes
              </Link>
              <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 font-medium transition text-sm">
                Dashboard
              </Link>
              {user.email === 'bodulevmax@gmail.com' && (
                <Link to="/admin" className="text-gray-600 hover:text-primary-600 font-medium transition text-sm">
                  Users
                </Link>
              )}
              <div className="flex items-center gap-2 bg-primary-50 px-3 py-1.5 rounded-full">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold">
                  {user.name[0]}
                </div>
                <span className="text-sm text-primary-700 font-medium">{user.name}</span>
              </div>
              <button
                onClick={() => { logout(); navigate('/') }}
                className="text-xs text-gray-400 hover:text-red-500 transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-primary-600 font-medium transition text-sm">
                Login
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-primary-500 to-emerald-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-primary-200 transition-all">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
