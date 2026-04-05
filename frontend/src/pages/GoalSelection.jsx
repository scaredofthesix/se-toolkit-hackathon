import { useNavigate } from 'react-router-dom'

const goals = [
  {
    id: 'weight_loss',
    icon: '🏃',
    title: 'Weight Loss',
    desc: 'Low-calorie, high-protein recipes to help you shed pounds steadily.',
    range: '1,500 – 1,800 cal/day',
    gradient: 'from-blue-500 to-cyan-400',
    bg: 'hover:bg-blue-50/50',
    border: 'border-blue-200 hover:border-blue-400',
    iconBg: 'bg-blue-100',
  },
  {
    id: 'muscle_gain',
    icon: '💪',
    title: 'Muscle Gain',
    desc: 'High-protein, calorie-dense meals to fuel your workouts and growth.',
    range: '2,500 – 3,000 cal/day',
    gradient: 'from-red-500 to-orange-400',
    bg: 'hover:bg-red-50/50',
    border: 'border-red-200 hover:border-red-400',
    iconBg: 'bg-red-100',
  },
  {
    id: 'maintenance',
    icon: '⚖️',
    title: 'Maintenance',
    desc: 'Balanced meals to maintain your current weight and energy levels.',
    range: '2,000 – 2,200 cal/day',
    gradient: 'from-amber-500 to-yellow-400',
    bg: 'hover:bg-amber-50/50',
    border: 'border-amber-200 hover:border-amber-400',
    iconBg: 'bg-amber-100',
  },
  {
    id: 'healthy',
    icon: '🥦',
    title: 'Healthy Eating',
    desc: 'Nutrient-rich recipes with balanced macros for overall well-being.',
    range: 'No strict limit',
    gradient: 'from-emerald-500 to-green-400',
    bg: 'hover:bg-emerald-50/50',
    border: 'border-emerald-200 hover:border-emerald-400',
    iconBg: 'bg-emerald-100',
  },
]

export default function GoalSelection() {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 fade-in">
      <div className="text-center mb-14">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
          What's your <span className="gradient-text">nutrition goal</span>?
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto">Choose a goal and we'll tailor recipes just for you.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {goals.map((g) => (
          <button
            key={g.id}
            onClick={() => navigate('/level', { state: { goal: g.id } })}
            className={`glass p-7 rounded-2xl border ${g.border} ${g.bg} text-left card-hover group`}
          >
            <div className={`w-14 h-14 ${g.iconBg} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
              {g.icon}
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1.5">{g.title}</h2>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">{g.desc}</p>
            <span className={`inline-block bg-gradient-to-r ${g.gradient} text-white text-xs font-bold px-3.5 py-1.5 rounded-full`}>
              {g.range}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
