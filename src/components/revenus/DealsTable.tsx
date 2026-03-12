import type { Prospect } from '../../types'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

type DealsTableProps = {
  deals: Prospect[]
}

export const DealsTable = ({ deals }: DealsTableProps) => {
  return (
    <div className="overflow-hidden rounded-card border border-border-subtle bg-[#020617]/40 text-xs">
      <table className="min-w-full divide-y divide-border-subtle">
        <thead className="bg-[#020617]/60">
          <tr>
            <th className="px-3 py-2 text-left font-medium text-text-muted">Date</th>
            <th className="px-3 py-2 text-left font-medium text-text-muted">Nom</th>
            <th className="px-3 py-2 text-left font-medium text-text-muted">Niche</th>
            <th className="px-3 py-2 text-right font-medium text-text-muted">Valeur</th>
            <th className="px-3 py-2 text-left font-medium text-text-muted">Assigné</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {deals.map((p) => (
            <tr
              key={p.id}
              className="hover:bg-[#020617]/60"
            >
              <td className="px-3 py-2 text-[11px] text-text-muted">
                {format(new Date(p.createdAt), 'dd/MM', { locale: fr })}
              </td>
              <td className="px-3 py-2 text-[11px] font-medium text-text-primary">
                {p.name}
              </td>
              <td className="px-3 py-2 text-[11px] text-text-muted">
                {p.niche}
              </td>
              <td className="px-3 py-2 text-right text-[11px] font-mono-kpi text-accent-cyan">
                {p.dealValue.toLocaleString('fr-FR')} €
              </td>
              <td className="px-3 py-2 text-[11px] text-text-muted">
                {p.assignedTo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

