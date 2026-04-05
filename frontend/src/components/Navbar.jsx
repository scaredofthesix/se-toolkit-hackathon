import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-10 py-5 flex items-center justify-between">
        <Link to="/" className="group">
          <span className="font-display text-2xl font-bold tracking-wide">
            WhatToEat
          </span>
        </Link>
        <div className="flex items-center gap-8">
          {user ? (
            <>
              <Link to="/ingredients" className="font-body text-white/55 hover:text-white transition text-lg tracking-wide">
                Recipes
              </Link>
              <Link to="/dashboard" className="font-body text-white/55 hover:text-white transition text-lg tracking-wide">
                Dashboard
              </Link>
              {user.email === 'bodulevmax@gmail.com' && (
                <Link to="/admin" className="font-body text-white/55 hover:text-white transition text-lg tracking-wide">
                  Users
                </Link>
              )}
              <div className="flex items-center gap-3 ml-2">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black text-base font-display font-bold">
                  {user.name[0]}
                </div>
                <span className="font-body text-white/75 text-lg">{user.name}</span>
              </div>
              <button
                onClick={() => { logout(); navigate('/') }}
                className="font-body text-white/30 hover:text-white/70 transition text-base"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-body text-white/55 hover:text-white transition text-lg tracking-wide">
                Login
              </Link>
              <Link to="/register" className="btn-primary px-8 py-2.5 rounded-none font-body text-sm tracking-[0.12em] uppercase">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
