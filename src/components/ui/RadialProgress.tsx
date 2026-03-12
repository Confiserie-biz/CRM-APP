type RadialProgressProps = {
  value: number
  max?: number
}

export const RadialProgress = ({ value, max = 50 }: RadialProgressProps) => {
  const radius = 70
  const strokeWidth = 10
  const circumference = 2 * Math.PI * radius
  const progress = Math.min(1, value / max)
  const offset = circumference * (1 - progress)

  return (
    <div className="flex flex-col items-center justify-center">
      <svg className="h-40 w-40" viewBox="0 0 160 160">
        <defs>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#00ffcc" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r={radius} stroke="#020617" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx="80" cy="80" r={radius}
          stroke="url(#ring-gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 80 80)"
        />
        <text x="50%" y="50%" textAnchor="middle" dy="-6" className="font-mono-kpi text-2xl" fill="#f1f5f9">
          {value}
        </text>
        <text x="50%" y="50%" textAnchor="middle" dy="20" className="text-xs" fill="#64748b">
          calls
        </text>
      </svg>
    </div>
  )
}