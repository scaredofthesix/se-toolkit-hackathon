import { useNavigate, useLocation } from 'react-router-dom'

const levels = [
  {
    id: 'beginner',
    title: 'Beginner',
    desc: 'Simple recipes under 30 minutes. No complex techniques needed.',
    detail: 'Easy recipes only',
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    desc: 'More variety with moderate cooking skills. Some recipes take longer.',
    detail: 'Easy + medium recipes',
  },
  {
    id: 'advanced',
    title: 'Advanced',
    desc: 'Full range of recipes including complex multi-step dishes.',
    detail: 'All difficulty levels',
  },
]

export default function LevelSelection() {
  const navigate = useNavigate()
  const location = useLocation()
  const goal = location.state?.goal || 'healthy'

  return (
    <div className="max-w-4xl mx-auto px-8 py-24 fade-in">
      <div className="text-center mb-16">
        <p className="font-body italic text-sand-500 text-xl mb-3">tell us about yourself</p>
        <h1 className="font-display text-6xl font-bold text-sand-900 leading-tight">
          Cooking <span className="italic font-normal">Experience</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {levels.map((l) => (
          <button
            key={l.id}
            onClick={() => navigate('/ingredients', { state: { goal, level: l.id } })}
            className="card p-8 rounded-2xl text-left group cursor-pointer"
          >
            <h2 className="font-display text-2xl font-bold text-sand-900 mb-2">{l.title}</h2>
            <p className="font-body text-sand-500 text-lg mb-5 leading-relaxed">{l.desc}</p>
            <span className="inline-block font-body text-sm font-semibold text-sand-100 bg-sand-800 px-4 py-1.5 rounded-full">
              {l.detail}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
