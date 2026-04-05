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
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center max-w-7xl mx-auto px-10 py-12 fade-in">
      <div className="text-center mb-14">
        <p className="font-body italic text-white/50 text-2xl mb-4">tell us about yourself</p>
        <h1 className="font-display text-[clamp(3rem,6vw,5rem)] font-bold leading-tight">
          Cooking Experience
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {levels.map((l) => (
          <button
            key={l.id}
            onClick={() => navigate('/ingredients', { state: { goal, level: l.id } })}
            className="card p-12 rounded-none text-left group cursor-pointer flex flex-col justify-center min-h-[300px]"
          >
            <h2 className="font-display text-3xl font-bold mb-4">{l.title}</h2>
            <p className="font-body text-white/55 text-xl mb-7 leading-relaxed">{l.desc}</p>
            <span className="inline-block self-start font-body text-sm tracking-[0.12em] uppercase text-black bg-white px-5 py-2">
              {l.detail}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
