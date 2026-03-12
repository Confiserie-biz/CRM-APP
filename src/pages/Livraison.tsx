import { useAppContext } from '../context/AppContext'
import { DeliveryCard } from '../components/livraison/DeliveryCard'

export const Livraison = () => {
  const { prospects, deliveryData, setDeliveryData } = useAppContext()

  const signedOrDelivered = prospects.filter(
    (p) => p.stage === 'Signé' || p.stage === 'Livré',
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
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {signedOrDelivered.map((p) => {
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

