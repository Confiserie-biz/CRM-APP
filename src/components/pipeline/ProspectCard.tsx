import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import type { Prospect } from '../../types'
import { Badge, nicheBadgeClasses, stageBadgeClasses } from '../ui/Badge'

type ProspectCardProps = {
  prospect: Prospect
  onClick: () => void
}

export const ProspectCard = ({ prospect, onClick }: ProspectCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: prospect.id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.75 : 1,
    boxShadow: isDragging ? '0 0 20px #00ffcc33' : undefined,
  }

  const lastContactLabel = formatDistanceToNow(new Date(prospect.lastContact), {
    addSuffix: true,
    locale: fr,
  })

  const daysSinceContact =
    (Date.now() - new Date(prospect.lastContact).getTime()) / (1000 * 60 * 60 * 24)

  const showRedDot = daysSinceContact > 5

  const initials =
    prospect.assignedTo === 'Terence'
      ? 'MO'
      : 'AS'

  const assignedColor =
    prospect.assignedTo === 'Terence'
      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
      : 'bg-sky-500/20 text-sky-300 border-sky-500/30'

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="card card-hover cursor-grab space-y-2.5 border-border-subtle bg-[#020617]/60 active:cursor-grabbing"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-text-primary">
            {prospect.name}
          </p>
          <p className="text-[11px] text-text-muted">
            {prospect.region}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-medium ${assignedColor}`}
          >
            {initials}
          </div>
          {showRedDot && (
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge className={nicheBadgeClasses[prospect.niche]}>{prospect.niche}</Badge>
        <Badge className={stageBadgeClasses[prospect.stage]}>{prospect.stage}</Badge>
        {prospect.objection && (
          <Badge className="bg-[#451a03] text-[#fb923c]">
            {prospect.objection}
          </Badge>
        )}
      </div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-mono-kpi text-accent-cyan">
          {prospect.dealValue.toLocaleString('fr-FR')} €
        </span>
        <span className="text-text-muted">
          {lastContactLabel}
        </span>
      </div>
    </div>
  )
}

