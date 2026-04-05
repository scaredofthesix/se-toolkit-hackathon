import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-4 sm:py-5 flex items-center justify-between">
        <Link to="/" className="group">
          <span className="font-display text-xl sm:text-2xl font-bold tracking-wide">
            WhatToEat
          </span>
        </Link>

        {/* Mobile burger */}
        <button onClick={() => setOpen(!open)} className="sm:hidden flex flex-col gap-1.5 p-2">
          <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-8">
          {user ? (
            <>
              <Link to="/ingredients" className="font-body text-white/55 hover:text-white transition text-lg tracking-wide">Recipes</Link>
              <Link to="/dashboard" className="font-body text-white/55 hover:text-white transition text-lg tracking-wide">Dashboard</Link>
              {user.email === 'bodulevmax@gmail.com' && (
                <Link to="/admin" className="font-body text-white/55 hover:text-white transition text-lg tracking-wide">Users</Link>
              )}
              <div className="flex items-center gap-3 ml-2">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black text-base font-display font-bold">{user.name[0]}</div>
                <span className="font-body text-white/75 text-lg">{user.name}</span>
              </div>
              <button onClick={() => { logout(); navigate('/') }} className="font-body text-white/30 hover:text-white/70 transition text-base">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-body text-white/55 hover:text-white transition text-lg tracking-wide">Login</Link>
              <Link to="/register" className="btn-primary px-8 py-2.5 rounded-none font-body text-sm tracking-[0.12em] uppercase">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-white/[0.07] px-4 py-4 flex flex-col gap-4 bg-black/95">
          {user ? (
            <>
              <Link to="/ingredients" onClick={() => setOpen(false)} className="font-body text-white/70 text-lg">Recipes</Link>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="font-body text-white/70 text-lg">Dashboard</Link>
              {user.email === 'bodulevmax@gmail.com' && (
                <Link to="/admin" onClick={() => setOpen(false)} className="font-body text-white/70 text-lg">Users</Link>
              )}
              <button onClick={() => { logout(); navigate('/'); setOpen(false) }} className="font-body text-white/40 text-lg text-left">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="font-body text-white/70 text-lg">Login</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="font-body text-white/70 text-lg">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
