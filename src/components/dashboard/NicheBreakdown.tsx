import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useAppContext } from '../../context/AppContext'
import type { Niche } from '../../types'

const NICHE_COLORS: Record<Niche, string> = {
  Plombier: '#22c55e',
  Électricien: '#0ea5e9',
  Paysagiste: '#f97316',
  Nettoyage: '#818cf8',
  Coiffure: '#ec4899',
}

export const NicheBreakdown = () => {
  const { prospects } = useAppContext()

  const nicheData = useMemo(() => {
    const map = new Map<Niche, { count: number; amount: number }>()

    for (const p of prospects) {
      const existing = map.get(p.niche as Niche) ?? { count: 0, amount: 0 }
      map.set(p.niche as Niche, {
        count: existing.count + 1,
        amount: existing.amount + p.dealValue,
      })
    }

    return Array.from(map.entries()).map(([niche, data]) => ({
      niche,
      count: data.count,
      amount: data.amount,
    }))
  }, [prospects])

  const formatValue = (value: any) => {
    return [`${Number(value).toLocaleString('fr-FR')} €`, 'CA']
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Répartition par niche
          </p>
          <p className="mt-1 text-xs text-text-muted">
            Volume de prospects et CA estimé par niche.
          </p>
        </div>
      </div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={nicheData}
            layout="vertical"
            margin={{ left: 80, right: 16, top: 10, bottom: 10 }}
          >
            <CartesianGrid stroke="#1f2937" horizontal={false} />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={{ stroke: '#1f2937' }}
              tick={{ fill: '#9ca3af', fontSize: 11 }}
            />
            <YAxis
              dataKey="niche"
              type="category"
              tickLine={false}
              axisLine={{ stroke: '#1f2937' }}
              tick={{ fill: '#e5e7eb', fontSize: 11 }}
            />
            <Tooltip
              cursor={{ fill: '#0b11201a' }}
              contentStyle={{
                backgroundColor: '#020617',
                border: '1px solid #1f2937',
                borderRadius: 8,
                fontSize: 11,
              }}
              labelStyle={{ color: '#e5e7eb' }}
              formatter={formatValue}
            />
            <Bar dataKey="amount" name="CA" radius={[0, 6, 6, 0]}>
              {nicheData.map((entry) => (
                <Cell key={entry.niche} fill={NICHE_COLORS[entry.niche] ?? '#818cf8'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
