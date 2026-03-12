import type { Call } from '../../types'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

type CallsTableProps = {
  calls: Call[]
}

const resultClasses: Record<Call['result'], string> = {
  Intéressé: 'bg-emerald-500/10 text-emerald-300',
  'Pas intéressé': 'bg-red-500/10 text-red-300',
  Rappeler: 'bg-amber-500/10 text-amber-300',
  'Démo bookée': 'bg-violet-500/10 text-violet-300',
  Messagerie: 'bg-slate-500/10 text-slate-300',
}

export const CallsTable = ({ calls }: CallsTableProps) => {
  return (
    <div className="overflow-hidden rounded-card border border-border-subtle bg-[#020617]/40 text-xs">
      <table className="min-w-full divide-y divide-border-subtle">
        <thead className="bg-[#020617]/60">
          <tr>
            <th className="px-3 py-2 text-left font-medium text-text-muted">Date</th>
            <th className="px-3 py-2 text-left font-medium text-text-muted">Prospect</th>
            <th className="px-3 py-2 text-left font-medium text-text-muted">Résultat</th>
            <th className="px-3 py-2 text-left font-medium text-text-muted">Note</th>
            <th className="px-3 py-2 text-left font-medium text-text-muted">Assigné</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {calls.map((c) => (
            <tr
              key={c.id}
              className="hover:bg-[#020617]/60"
            >
              <td className="px-3 py-2 text-[11px] text-text-muted">
                {format(new Date(c.calledAt), 'dd/MM à HH:mm', { locale: fr })}
              </td>
              <td className="px-3 py-2 text-[11px] font-medium text-text-primary">
                {c.prospectName}
              </td>
              <td className="px-3 py-2 text-[11px]">
                <span
                  className={`badge ${resultClasses[c.result]}`}
                >
                  {c.result}
                </span>
              </td>
              <td className="px-3 py-2 text-[11px] text-text-muted">
                {c.note}
              </td>
              <td className="px-3 py-2 text-[11px] text-text-muted">
                {c.assignedTo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

