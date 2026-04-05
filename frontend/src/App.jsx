import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import GoalSelection from './pages/GoalSelection'
import LevelSelection from './pages/LevelSelection'
import IngredientInput from './pages/IngredientInput'
import Results from './pages/Results'
import RecipeDetail from './pages/RecipeDetail'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import { useAuth } from './context/AuthContext'

export default function App() {
  const { loading } = useAuth()
  const location = useLocation()
  const isLanding = location.pathname === '/'

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <p className="font-body text-white/50 text-xl italic">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {!isLanding && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/goals" element={<GoalSelection />} />
        <Route path="/level" element={<LevelSelection />} />
        <Route path="/ingredients" element={<IngredientInput />} />
        <Route path="/results" element={<Results />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  )
}
