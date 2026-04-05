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
    <div className="max-w-4xl mx-auto px-8 py-24 fade-in">
      <div className="text-center mb-16">
        <p className="font-body italic text-sand-500 text-xl mb-3">choose your path</p>
        <h1 className="font-display text-6xl font-bold text-sand-900 leading-tight">
          Nutrition <span className="italic font-normal">Goal</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {goals.map((g) => (
          <button
            key={g.id}
            onClick={() => navigate('/level', { state: { goal: g.id } })}
            className="card p-8 rounded-2xl text-left group cursor-pointer"
          >
            <h2 className="font-display text-2xl font-bold text-sand-900 mb-2">{g.title}</h2>
            <p className="font-body text-sand-500 text-lg mb-5 leading-relaxed">{g.desc}</p>
            <span className="inline-block font-body text-sm font-semibold text-sand-100 bg-sand-800 px-4 py-1.5 rounded-full">
              {g.range}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
