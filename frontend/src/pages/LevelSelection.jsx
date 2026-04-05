import { useNavigate, useLocation } from 'react-router-dom'

const levels = [
  {
    id: 'beginner',
    icon: '🌱',
    title: 'Beginner',
    desc: 'Simple recipes under 30 minutes. No complex techniques needed.',
    detail: 'Easy recipes only',
    gradient: 'from-emerald-500 to-green-400',
    border: 'border-emerald-200 hover:border-emerald-400',
    iconBg: 'bg-emerald-100',
  },
  {
    id: 'intermediate',
    icon: '🍳',
    title: 'Intermediate',
    desc: 'More variety with moderate cooking skills. Some recipes take longer.',
    detail: 'Easy + medium recipes',
    gradient: 'from-amber-500 to-yellow-400',
    border: 'border-amber-200 hover:border-amber-400',
    iconBg: 'bg-amber-100',
  },
  {
    id: 'advanced',
    icon: '👨‍🍳',
    title: 'Advanced',
    desc: 'Full range of recipes including complex multi-step dishes.',
    detail: 'All difficulty levels',
    gradient: 'from-rose-500 to-red-400',
    border: 'border-rose-200 hover:border-rose-400',
    iconBg: 'bg-rose-100',
  },
]

export default function LevelSelection() {
  const navigate = useNavigate()
  const location = useLocation()
  const goal = location.state?.goal || 'healthy'

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 fade-in">
      <div className="text-center mb-14">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
          Your <span className="gradient-text">cooking experience</span>?
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto">This adjusts recipe complexity and calorie targets.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {levels.map((l) => (
          <button
            key={l.id}
            onClick={() => navigate('/ingredients', { state: { goal, level: l.id } })}
            className={`glass p-7 rounded-2xl border ${l.border} text-left card-hover group hover:bg-white/60`}
          >
            <div className={`w-14 h-14 ${l.iconBg} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
              {l.icon}
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1.5">{l.title}</h2>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">{l.desc}</p>
            <span className={`inline-block bg-gradient-to-r ${l.gradient} text-white text-xs font-bold px-3.5 py-1.5 rounded-full`}>
              {l.detail}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
