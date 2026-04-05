import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-50 bg-sand-200/80 backdrop-blur-md border-b border-sand-300/50">
      <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
        <Link to="/" className="group">
          <span className="font-display text-2xl font-bold tracking-wide">
            What<span className="italic font-normal">To</span>Eat
          </span>
        </Link>
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link to="/ingredients" className="font-body text-sand-600 hover:text-sand-900 transition text-lg">
                Recipes
              </Link>
              <Link to="/dashboard" className="font-body text-sand-600 hover:text-sand-900 transition text-lg">
                Dashboard
              </Link>
              {user.email === 'bodulevmax@gmail.com' && (
                <Link to="/admin" className="font-body text-sand-600 hover:text-sand-900 transition text-lg">
                  Users
                </Link>
              )}
              <div className="flex items-center gap-3 ml-2">
                <div className="w-8 h-8 rounded-full bg-sand-800 flex items-center justify-center text-sand-100 text-sm font-display font-bold">
                  {user.name[0]}
                </div>
                <span className="font-body text-sand-700 text-lg">{user.name}</span>
              </div>
              <button
                onClick={() => { logout(); navigate('/') }}
                className="font-body text-sand-400 hover:text-sand-800 transition text-base"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-body text-sand-600 hover:text-sand-900 transition text-lg">
                Login
              </Link>
              <Link to="/register" className="btn-primary px-6 py-2 rounded-full font-body text-base font-semibold">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
