import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useMemo, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import type { Prospect, Stage } from '../../types'
import { KanbanColumn } from './KanbanColumn'
import { SlideOver } from '../ui/SlideOver'
import { Badge, nicheBadgeClasses, stageBadgeClasses } from '../ui/Badge'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const stages: Stage[] = [
  'Prospect',
  'Appelé',
  'Démo bookée',
  'Démo faite',
  'POC',
  'Signé',
  'Livré',
]

type KanbanBoardProps = {
  prospects: Prospect[]
}

export const KanbanBoard = ({ prospects }: KanbanBoardProps) => {
  const { updateProspectStage, markContactedToday } = useAppContext()
  const [selected, setSelected] = useState<Prospect | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  )

  const columns = useMemo(
    () =>
      stages.map((stage) => ({
        stage,
        prospects: prospects.filter((p) => p.stage === stage),
      })),
    [prospects],
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    const prospectId = active.id as string
    const targetStage = over.id as Stage
    updateProspectStage(prospectId, targetStage)
  }

  const goToNextStage = (p: Prospect) => {
    const idx = stages.indexOf(p.stage)
    if (idx === -1 || idx === stages.length - 1) return
    updateProspectStage(p.id, stages[idx + 1])
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
          <SortableContext items={prospects.map((p) => p.id)}>
            {columns.map((col) => (
              <KanbanColumn
                key={col.stage}
                stage={col.stage}
                prospects={col.prospects}
                onCardClick={setSelected}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>

      <SlideOver
        title={selected?.name ?? ''}
        isOpen={!!selected}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <div className="space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-text-primary">{selected.name}</p>
                <p className="text-text-muted">{selected.region}</p>
              </div>
              <div className="text-right">
                <p className="font-mono-kpi text-accent-cyan">
                  {selected.dealValue.toLocaleString('fr-FR')} €
                </p>
                <p className="text-[11px] text-text-muted">
                  Créé le {format(new Date(selected.createdAt), 'dd/MM', { locale: fr })}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <Badge className={nicheBadgeClasses[selected.niche]}>{selected.niche}</Badge>
              <Badge className={stageBadgeClasses[selected.stage]}>{selected.stage}</Badge>
              {selected.objection && (
                <Badge className="bg-[#451a03] text-[#fb923c]">
                  {selected.objection}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-[11px] font-medium text-text-muted">Téléphone</p>
                <p className="font-mono-kpi text-sm text-text-primary">
                  {selected.phone}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-medium text-text-muted">Assigné à</p>
                <p className="text-sm text-text-primary">{selected.assignedTo}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-medium text-text-muted">Dernier contact</p>
                <p className="text-sm text-text-primary">
                  {format(new Date(selected.lastContact), 'dd/MM à HH:mm', { locale: fr })}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-medium text-text-muted">Site web</p>
                <p className="text-sm text-text-primary">
                  {selected.hasWebsite ? 'Oui' : 'Non'}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] font-medium text-text-muted">Notes</p>
              <p className="text-sm text-text-primary">
                {selected.notes || 'Pas de note pour le moment.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  goToNextStage(selected)
                }}
                className="rounded-lg bg-accent-cyan/10 px-3 py-1.5 text-[11px] font-medium text-accent-cyan transition duration-200 hover:bg-accent-cyan/20"
              >
                Étape suivante
              </button>
              <button
                type="button"
                onClick={() => {
                  markContactedToday(selected.id)
                }}
                className="rounded-lg bg-emerald-500/10 px-3 py-1.5 text-[11px] font-medium text-emerald-400 transition duration-200 hover:bg-emerald-500/20"
              >
                Marquer contacté aujourd’hui
              </button>
            </div>
          </div>
        )}
      </SlideOver>
    </>
  )
}

