type ProgressBarProps = {
  value: number
  max?: number
  showLabel?: boolean
}

export const ProgressBar = ({ value, max = 100, showLabel = true }: ProgressBarProps) => {
  const percent = Math.max(0, Math.min(100, (value / max) * 100))

  return (
    <div className="space-y-1">
      <div className="h-2 overflow-hidden rounded-full bg-[#020617]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 transition-[width] duration-200"
          style={{ width: `${percent}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-text-muted">
          {percent.toFixed(0)}%
        </p>
      )}
    </div>
  )
}

