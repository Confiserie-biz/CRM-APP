import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts'
import { revenueByMonth, revenueByNiche } from '../../data/mockData'

const COLORS = ['#22c55e', '#0ea5e9', '#f97316', '#818cf8', '#ec4899']

export const RevenueCharts = () => {
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)]">
      <div className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
          CA par mois (6 derniers mois)
        </p>
        <div className="h-60 rounded-card border border-border-subtle bg-[#020617]/40 p-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueByMonth}>
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
                contentStyle={{
                  backgroundColor: '#020617',
                  border: '1px solid #1f2937',
                  borderRadius: 8,
                  fontSize: 11,
                }}
                labelStyle={{ color: '#e5e7eb' }}
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
      <div className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
          CA par niche
        </p>
        <div className="h-60 rounded-card border border-border-subtle bg-[#020617]/40 p-3">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#020617',
                  border: '1px solid #1f2937',
                  borderRadius: 8,
                  fontSize: 11,
                }}
                labelStyle={{ color: '#e5e7eb' }}
              />
              <Pie
                data={revenueByNiche}
                dataKey="amount"
                nameKey="niche"
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={40}
                paddingAngle={3}
              >
                {revenueByNiche.map((entry, index) => (
                  <Cell
                    key={entry.niche}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="grid grid-cols-2 gap-2 text-[11px]">
          {revenueByNiche.map((niche, index) => (
            <li
              key={niche.niche}
              className="flex items-center justify-between rounded-lg border border-border-subtle bg-[#020617]/60 px-3 py-1.5"
            >
              <span className="flex items-center gap-2 text-text-muted">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                {niche.niche}
              </span>
              <span className="font-mono-kpi text-xs text-text-primary">
                {niche.amount.toLocaleString('fr-FR')} €
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

