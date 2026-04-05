import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
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

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-gray-400">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<GoalSelection />} />
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
