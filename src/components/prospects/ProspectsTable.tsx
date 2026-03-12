import type { Prospect } from '../../types'
import { Badge, nicheBadgeClasses, stageBadgeClasses } from '../ui/Badge'

type ProspectsTableProps = {
  prospects: Prospect[]
  onEdit: (prospect: Prospect) => void
  onDelete: (prospect: Prospect) => void
}

export const ProspectsTable = ({ prospects, onEdit, onDelete }: ProspectsTableProps) => {
  return (
    <div className="overflow-hidden rounded-card border border-border-subtle bg-[#020617]/40 text-xs">
      <table className="min-w-full divide-y divide-border-subtle">
        <thead className="bg-[#020617]/60">
          <tr>
            <th className="px-3 py-2 text-left font-medium text-text-muted">Nom</th>
            <th className="px-3 py-2 text-left font-medium text-text-muted">Téléphone</th>
            <th className="px-3 py-2 text-left font-medium text-text-muted">Région</th>
            <th className="px-3 py-2 text-left font-medium text-text-muted">Niche</th>
            <th className="px-3 py-2 text-left font-medium text-text-muted">Étape</th>
            <th className="px-3 py-2 text-right font-medium text-text-muted">Valeur</th>
            <th className="px-3 py-2 text-left font-medium text-text-muted">Assigné</th>
            <th className="px-3 py-2 text-left font-medium text-text-muted">Objection</th>
            <th className="px-3 py-2 text-right font-medium text-text-muted">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {prospects.map((p) => (
            <tr
              key={p.id}
              className="hover:bg-[#020617]/60"
            >
              <td className="px-3 py-2 text-[11px] font-medium text-text-primary">
                {p.name}
              </td>
              <td className="px-3 py-2 text-[11px] text-text-muted">
                {p.phone}
              </td>
              <td className="px-3 py-2 text-[11px] text-text-muted">
                {p.region}
              </td>
              <td className="px-3 py-2 text-[11px]">
                <Badge className={nicheBadgeClasses[p.niche]}>{p.niche}</Badge>
              </td>
              <td className="px-3 py-2 text-[11px]">
                <Badge className={stageBadgeClasses[p.stage]}>{p.stage}</Badge>
              </td>
              <td className="px-3 py-2 text-right text-[11px] font-mono-kpi text-accent-cyan">
                {p.dealValue.toLocaleString('fr-FR')} €
              </td>
              <td className="px-3 py-2 text-[11px] text-text-muted">
                {p.assignedTo}
              </td>
              <td className="px-3 py-2 text-[11px] text-text-muted">
                {p.objection || '-'}
              </td>
              <td className="px-3 py-2 text-right text-[11px]">
                <div className="inline-flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => onEdit(p)}
                    className="rounded-md bg-accent-cyan/10 px-2 py-1 text-[10px] font-medium text-accent-cyan hover:bg-accent-cyan/20"
                  >
                    Éditer
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(p)}
                    className="rounded-md bg-red-500/10 px-2 py-1 text-[10px] font-medium text-red-400 hover:bg-red-500/20"
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

