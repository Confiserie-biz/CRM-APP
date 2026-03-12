import { useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import type { Call } from '../types'
import { CallCounter } from '../components/calls/CallCounter'
import { LogCallModal } from '../components/calls/LogCallModal'
import { CallsTable } from '../components/calls/CallsTable'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { format } from 'date-fns'

export const Calls = () => {
  const { calls, addCall, removeLastCallByResult, prospects } = useAppContext()
  const [isLogOpen, setIsLogOpen] = useState(false)
  const [resultFilter, setResultFilter] = useState<'Tous' | Call['result']>('Tous')

  const filteredCalls = useMemo(
    () =>
      calls.filter((c) => {
        if (resultFilter !== 'Tous' && c.result !== resultFilter) return false
        return true
      }),
    [calls, resultFilter],
  )

  const sparkData = useMemo(() => {
    const byDay = new Map<string, number>()
    for (const c of calls) {
      const key = format(new Date(c.calledAt), 'yyyy-MM-dd')
      byDay.set(key, (byDay.get(key) ?? 0) + 1)
    }
    return Array.from(byDay.entries())
      .sort(([a], [b]) => (a < b ? -1 : 1))
      .slice(-7)
      .map(([date, count]) => ({
        date: format(new Date(date), 'dd/MM'),
        count,
      }))
  }, [calls])

  const todaysInterested = useMemo(
    () =>
      calls.filter((c) => {
        const today = new Date()
        return (
          new Date(c.calledAt).toDateString() === today.toDateString() &&
          c.result === 'Intéressé'
        )
      }).length,
    [calls],
  )

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-text-primary">Calls</h1>
          <p className="text-xs text-text-muted">
            Suivi quotidien de ton volume d'appels et des résultats.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsLogOpen(true)}
          className="rounded-lg bg-accent-cyan/10 px-3 py-1.5 text-[11px] font-medium text-accent-cyan hover:bg-accent-cyan/20"
        >
          ＋ Logger un call
        </button>
      </header>

      <section className="card card-hover">
        <CallCounter
          calls={calls}
          onAddCalls={(count) => {
            for (let i = 0; i < count; i++) {
              addCall({ prospectId: null, prospectName: 'Appel générique', result: 'Messagerie', note: '', assignedTo: 'Moi' })
            }
          }}
          onAddCallWithResult={(result) => {
            addCall({ prospectId: null, prospectName: 'Appel générique', result, note: '', assignedTo: 'Moi' })
          }}
          onRemoveCallWithResult={(result) => {
            removeLastCallByResult(result)
          }}
        />
      </section>

      <section className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="card card-hover space-y-3">
          <div className="flex items-center justify-between gap-3 text-xs">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
              Historique des calls
            </p>
            <select
              value={resultFilter}
              onChange={(e) =>
                setResultFilter(e.target.value as 'Tous' | Call['result'])
              }
              className="rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
            >
              <option value="Tous">Résultat · Tous</option>
              <option value="Intéressé">Intéressé</option>
              <option value="Pas intéressé">Pas intéressé</option>
              <option value="Rappeler">Rappeler</option>
              <option value="Démo bookée">Démo bookée</option>
              <option value="Messagerie">Messagerie</option>
            </select>
          </div>
          <CallsTable calls={filteredCalls} />
        </div>
        <div className="card card-hover space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Stats semaine (calls / jour)
          </p>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparkData}>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
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
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg border border-border-subtle bg-[#020617]/60 px-3 py-2">
              <p className="text-[11px] text-text-muted">Meilleur jour (sur 7j)</p>
              <p className="font-mono-kpi text-sm text-text-primary">
                {sparkData.reduce(
                  (best, d) => (d.count > best.count ? d : best),
                  { date: '-', count: 0 },
                ).date}
              </p>
            </div>
            <div className="rounded-lg border border-border-subtle bg-[#020617]/60 px-3 py-2">
              <p className="text-[11px] text-text-muted">Intéressés aujourd'hui</p>
              <p className="font-mono-kpi text-sm text-emerald-400">
                {todaysInterested}
              </p>
            </div>
          </div>
        </div>
      </section>

      <LogCallModal
        isOpen={isLogOpen}
        onClose={() => setIsLogOpen(false)}
        prospects={prospects.map((p) => ({ id: p.id, name: p.name }))}
        onSubmit={(data) => {
          addCall({
            ...data,
          })
        }}
      />
    </div>
  )
}