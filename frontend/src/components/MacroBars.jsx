export default function MacroBars({ protein, carbs, fat }) {
  const total = protein + carbs + fat || 1
  const items = [
    { label: 'Protein', value: protein, color: 'bg-sand-800' },
    { label: 'Carbs', value: carbs, color: 'bg-sand-500' },
    { label: 'Fat', value: fat, color: 'bg-sand-400' },
  ]
  return (
    <div className="space-y-2.5 font-body text-base">
      {items.map((m) => (
        <div key={m.label} className="flex items-center gap-3">
          <span className="w-16 text-sand-500">{m.label}</span>
          <div className="flex-1 bg-sand-200 rounded-full h-2.5 overflow-hidden">
            <div
              className={`${m.color} h-2.5 rounded-full transition-all duration-500`}
              style={{ width: `${Math.min((m.value / total) * 100, 100)}%` }}
            />
          </div>
          <span className="w-12 text-right text-sand-700 font-semibold">{m.value}g</span>
        </div>
      ))}
    </div>
  )
}
