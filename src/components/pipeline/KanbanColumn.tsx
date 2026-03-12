import { useDroppable } from '@dnd-kit/core'
import type { Prospect, Stage } from '../../types'
import { ProspectCard } from './ProspectCard'

type KanbanColumnProps = {
  stage: Stage
  prospects: Prospect[]
  onCardClick: (prospect: Prospect) => void
}

const stageLabels: Record<Stage, string> = {
  Prospect: 'Prospect',
  Appelé: 'Appelé',
  'Démo bookée': 'Démo bookée',
  'Démo faite': 'Démo faite',
  POC: 'POC',
  Signé: 'Signé',
  Livré: 'Livré',
}

export const KanbanColumn = ({ stage, prospects, onCardClick }: KanbanColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: stage,
  })

  const totalValue = prospects.reduce((sum, p) => sum + p.dealValue, 0)

  return (
    <div className="flex min-w-[260px] flex-1 flex-col">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-text-primary">
            {stageLabels[stage]}
          </p>
          <p className="text-[11px] text-text-muted">
            {prospects.length} deals · {totalValue.toLocaleString('fr-FR')} €
          </p>
        </div>
      </div>
      <div
        ref={setNodeRef}
        className={`flex flex-1 flex-col gap-3 rounded-xl border border-dashed border-border-subtle/60 bg-[#020617]/50 p-2.5 ${
          isOver ? 'border-accent-cyan/60 bg-[#0f172a]' : ''
        }`}
      >
        {prospects.map((p) => (
          <ProspectCard
            key={p.id}
            prospect={p}
            onClick={() => onCardClick(p)}
          />
        ))}
      </div>
    </div>
  )
}

