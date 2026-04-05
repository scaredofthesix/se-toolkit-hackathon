import { useNavigate } from 'react-router-dom'

const goals = [
  {
    id: 'weight_loss',
    title: 'Weight Loss',
    desc: 'Low-calorie, high-protein recipes to help you shed pounds steadily.',
    range: '1,500 - 1,800 cal/day',
  },
  {
    id: 'muscle_gain',
    title: 'Muscle Gain',
    desc: 'High-protein, calorie-dense meals to fuel your workouts and growth.',
    range: '2,500 - 3,000 cal/day',
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    desc: 'Balanced meals to maintain your current weight and energy levels.',
    range: '2,000 - 2,200 cal/day',
  },
  {
    id: 'healthy',
    title: 'Healthy Eating',
    desc: 'Nutrient-rich recipes with balanced macros for overall well-being.',
    range: 'No strict limit',
  },
]

export default function GoalSelection() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-10 py-8 sm:py-12 fade-in">
      <div className="text-center mb-8 sm:mb-14">
        <p className="font-body italic text-white/50 text-lg sm:text-2xl mb-4">choose your path</p>
        <h1 className="font-display text-[clamp(3rem,6vw,5rem)] font-bold leading-tight">
          Nutrition Goal
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 flex-1 sm:max-h-[60vh]">
        {goals.map((g) => (
          <button
            key={g.id}
            onClick={() => navigate('/level', { state: { goal: g.id } })}
            className="card p-6 sm:p-12 rounded-none text-left group cursor-pointer flex flex-col justify-end min-h-[150px] sm:min-h-[200px]"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">{g.title}</h2>
            <p className="font-body text-white/55 text-base sm:text-xl mb-4 sm:mb-6 leading-relaxed">{g.desc}</p>
            <span className="inline-block self-start font-body text-sm tracking-[0.12em] uppercase text-black bg-white px-5 py-2">
              {g.range}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
