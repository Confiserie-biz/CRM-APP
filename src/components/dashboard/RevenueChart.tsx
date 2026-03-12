import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useAppContext } from '../../context/AppContext'
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns'
import { fr } from 'date-fns/locale'

export const RevenueChart = () => {
  const { prospects } = useAppContext()

  const monthlyData = useMemo(() => {
    const now = new Date()
    const months: { month: string; amount: number }[] = []

    for (let i = 5; i >= 0; i--) {
      const target = subMonths(now, i)
      const start = startOfMonth(target)
      const end = endOfMonth(target)
      const label = format(target, 'MMM', { locale: fr })
      const capitalLabel = label.charAt(0).toUpperCase() + label.slice(1)

      let total = 0
      for (const p of prospects) {
        if ((p.stage === 'Signé' || p.stage === 'Livré') && p.signedAt) {
          const signedDate = new Date(p.signedAt)
          if (isWithinInterval(signedDate, { start, end })) {
            total += p.dealValue
          }
        }
      }

      months.push({ month: capitalLabel, amount: total })
    }

    return months
  }, [prospects])

  const formatValue = (value: any) => {
    return [`${Number(value).toLocaleString('fr-FR')} €`, 'CA']
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            CA par Terences
          </p>
          <p className="mt-1 text-xs text-text-muted">
            Basé sur les deals signés (6 derniers Terences).
          </p>
        </div>
      </div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid stroke="#1f2937" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: '#1f2937' }}
              tick={{ fill: '#9ca3af', fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: '#1f2937' }}
              tick={{ fill: '#9ca3af', fontSize: 11 }}
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
            <Bar
              dataKey="amount"
              fill="#00ffcc"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}