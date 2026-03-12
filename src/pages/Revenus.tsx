import { useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { RevenueCharts } from '../components/revenus/RevenueCharts'
import { DealsTable } from '../components/revenus/DealsTable'
import { ProgressBar } from '../components/ui/ProgressBar'

export const Revenus = () => {
  const { prospects, monthlyTarget, setMonthlyTarget } = useAppContext()
  const [targetInput, setTargetInput] = useState(monthlyTarget.toString())

  const signedDeals = useMemo(
    () => prospects.filter((p) => p.stage === 'Signé' || p.stage === 'Livré'),
    [prospects],
  )

  const totalSigned = signedDeals.reduce((sum, p) => sum + p.dealValue, 0)

  const byOwner = useMemo(
    () =>
      signedDeals.reduce(
        (acc, p) => {
          acc[p.assignedTo] += p.dealValue
          return acc
        },
        { Moi: 0, Associé: 0 },
      ),
    [signedDeals],
  )

  const projection = useMemo(() => {
    const today = new Date()
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
    const currentDay = today.getDate()
    if (currentDay === 0) return 0
    const daily = totalSigned / currentDay
    const remainingDays = daysInMonth - currentDay
    return Math.round(totalSigned + daily * remainingDays)
  }, [totalSigned])

  const handleSaveTarget = () => {
    const parsed = Number.parseInt(targetInput || '0', 10)
    if (!Number.isNaN(parsed) && parsed > 0) {
      setMonthlyTarget(parsed)
    }
  }

  const maxOwner = Math.max(byOwner.Moi, byOwner.Associé, 1)

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-text-primary">Revenus</h1>
          <p className="text-xs text-text-muted">
            Suivi de ton objectif mensuel, CA signé et projection de fin de mois.
          </p>
        </div>
      </header>

      <section className="card card-hover space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
              Objectif mensuel
            </p>
            <p className="mt-1 text-sm text-text-primary">
              {totalSigned.toLocaleString('fr-FR')} € /{' '}
              {monthlyTarget.toLocaleString('fr-FR')} €
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              className="w-32 rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
            />
            <button
              type="button"
              onClick={handleSaveTarget}
              className="rounded-lg bg-accent-cyan/10 px-3 py-1.5 text-[11px] font-medium text-accent-cyan hover:bg-accent-cyan/20"
            >
              Save
            </button>
          </div>
        </div>
        <ProgressBar value={totalSigned} max={monthlyTarget || 1} />
        <div className="grid gap-3 md:grid-cols-3 text-xs">
          <div className="rounded-lg border border-border-subtle bg-[#020617]/60 px-3 py-2">
            <p className="text-[11px] text-text-muted">CA signé</p>
            <p className="font-mono-kpi text-sm text-emerald-400">
              {totalSigned.toLocaleString('fr-FR')} €
            </p>
          </div>
          <div className="rounded-lg border border-border-subtle bg-[#020617]/60 px-3 py-2">
            <p className="text-[11px] text-text-muted">Projection fin de mois</p>
            <p className="font-mono-kpi text-sm text-accent-cyan">
              {projection.toLocaleString('fr-FR')} €
            </p>
          </div>
          <div className="rounded-lg border border-border-subtle bg-[#020617]/60 px-3 py-2">
            <p className="text-[11px] text-text-muted">Reste sur objectif</p>
            <p className="font-mono-kpi text-sm text-amber-400">
              {Math.max(0, monthlyTarget - totalSigned).toLocaleString('fr-FR')} €
            </p>
          </div>
        </div>
      </section>

      <section className="card card-hover">
        <RevenueCharts />
      </section>

      <section className="grid gap-4 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="card card-hover space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Deals signés
          </p>
          <DealsTable deals={signedDeals} />
        </div>
        <div className="card card-hover space-y-3 text-xs">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            CA par associé
          </p>
          <div className="space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[11px] text-text-muted">Moi</span>
                <span className="font-mono-kpi text-xs text-text-primary">
                  {byOwner.Moi.toLocaleString('fr-FR')} €
                </span>
              </div>
              <ProgressBar value={byOwner.Moi} max={maxOwner} showLabel={false} />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[11px] text-text-muted">Associé</span>
                <span className="font-mono-kpi text-xs text-text-primary">
                  {byOwner.Associé.toLocaleString('fr-FR')} €
                </span>
              </div>
              <ProgressBar value={byOwner.Associé} max={maxOwner} showLabel={false} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

