import type { ReactNode } from 'react'

type KPICardProps = {
  label: string
  value: string
  delta?: string
  accent?: 'green' | 'white' | 'orange' | 'violet' | 'cyan'
  icon?: ReactNode
}

const accentClasses: Record<NonNullable<KPICardProps['accent']>, string> = {
  green: 'text-emerald-400',
  white: 'text-slate-100',
  orange: 'text-amber-400',
  violet: 'text-violet-400',
  cyan: 'text-teal-300',
}

export const KPICard = ({ label, value, delta, accent = 'white', icon }: KPICardProps) => {
  return (
    <div className="card card-hover flex flex-1 flex-col justify-between gap-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">
            {label}
          </p>
        </div>
        {icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#020617] text-accent-cyan/80">
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <p className={`font-mono-kpi text-3xl font-semibold ${accentClasses[accent]}`}>{value}</p>
        {delta && (
          <span className="text-xs font-medium text-emerald-400">
            {delta}
          </span>
        )}
      </div>
    </div>
  )
}

