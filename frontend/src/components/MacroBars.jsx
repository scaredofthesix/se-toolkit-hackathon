export default function MacroBars({ protein, carbs, fat }) {
  const total = protein + carbs + fat || 1
  const items = [
    { label: 'Protein', value: protein, color: 'from-blue-400 to-blue-600', bg: 'bg-blue-50' },
    { label: 'Carbs', value: carbs, color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50' },
    { label: 'Fat', value: fat, color: 'from-rose-400 to-red-500', bg: 'bg-rose-50' },
  ]
  return (
    <div className="space-y-2 text-xs">
      {items.map((m) => (
        <div key={m.label} className="flex items-center gap-2">
          <span className="w-12 text-gray-500 font-medium">{m.label}</span>
          <div className={`flex-1 ${m.bg} rounded-full h-2.5 overflow-hidden`}>
            <div
              className={`bg-gradient-to-r ${m.color} h-2.5 rounded-full transition-all duration-500`}
              style={{ width: `${Math.min((m.value / total) * 100, 100)}%` }}
            />
          </div>
          <span className="w-10 text-right text-gray-600 font-semibold">{m.value}g</span>
        </div>
      ))}
    </div>
  )
}
