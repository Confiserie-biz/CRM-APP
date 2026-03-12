import type { ReactNode } from 'react'

type HotDealRow = {
  id: string
  name: string
  niche: string
  stage: string
  dealValue: number
  assignedTo: 'Terence' | 'Néo'
  lastContact: string
}

type HotDealsTableProps = {
  deals: HotDealRow[]
  renderBadges: (deal: HotDealRow) => ReactNode
  relativeDate: (iso: string) => string
}

export const HotDealsTable = ({ deals, renderBadges, relativeDate }: HotDealsTableProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Deals chauds
          </p>
          <p className="mt-1 text-xs text-text-muted">
            Prospects en démo faite ou POC, triés par valeur.
          </p>
        </div>
      </div>
      <div className="overflow-hidden rounded-card border border-border-subtle bg-[#020617]/40">
        <table className="min-w-full divide-y divide-border-subtle text-xs">
          <thead className="bg-[#020617]/60">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-text-muted">Nom</th>
              <th className="px-3 py-2 text-left font-medium text-text-muted">Niche / Étape</th>
              <th className="px-3 py-2 text-right font-medium text-text-muted">Valeur</th>
              <th className="px-3 py-2 text-left font-medium text-text-muted">Assigné</th>
              <th className="px-3 py-2 text-left font-medium text-text-muted">Dernier contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {deals.map((deal) => (
              <tr
                key={deal.id}
                className="hover:bg-[#020617]/60"
              >
                <td className="px-3 py-2 text-[11px] font-medium text-text-primary">
                  {deal.name}
                </td>
                <td className="px-3 py-2 text-[11px]">
                  {renderBadges(deal)}
                </td>
                <td className="px-3 py-2 text-right text-[11px] font-mono-kpi text-accent-cyan">
                  {deal.dealValue.toLocaleString('fr-FR')} €
                </td>
                <td className="px-3 py-2 text-[11px] text-text-muted">
                  {deal.assignedTo}
                </td>
                <td className="px-3 py-2 text-[11px] text-text-muted">
                  {relativeDate(deal.lastContact)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

