import { useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { DeliveryCard } from '../components/livraison/DeliveryCard'

export const Livraison = () => {
  const { prospects, deliveryData, setDeliveryData } = useAppContext()
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const signedOrDelivered = useMemo(
    () =>
      prospects.filter((p) => p.stage === 'Signé' || p.stage === 'Livré'),
    [prospects],
  )

  const sortedSigned = useMemo(
    () =>
      [...signedOrDelivered].sort((a, b) => {
        // si signedAt existe dans le type, on le prend en priorité, sinon createdAt
        const aDate = (a as any).signedAt ?? a.createdAt
        const bDate = (b as any).signedAt ?? b.createdAt
        const da = new Date(aDate).getTime()
        const db = new Date(bDate).getTime()
        return sortDirection === 'asc' ? da - db : db - da
      }),
    [signedOrDelivered, sortDirection],
  )

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-text-primary">Livraison</h1>
          <p className="text-xs text-text-muted">
            Suivi opérationnel des clients signés jusqu’à la mise en production.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'))
          }
          className="rounded-lg border border-border-subtle px-3 py-1.5 text-[11px] text-text-muted hover:border-accent-cyan/40 hover:text-text-primary"
        >
          Tri&nbsp;:{' '}
          {sortDirection === 'desc'
            ? 'Plus récent → ancien'
            : 'Plus ancien → récent'}
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {sortedSigned.map((p) => {
          const delivery = deliveryData.find((d) => d.prospectId === p.id)
          if (!delivery) return null
          return (
            <DeliveryCard
              key={p.id}
              prospect={p}
              delivery={delivery}
              onChange={(updated) =>
                setDeliveryData((prev) =>
                  prev.map((d) => (d.prospectId === updated.prospectId ? updated : d)),
                )
              }
            />
          )
        })}
      </section>
    </div>
  )
}

