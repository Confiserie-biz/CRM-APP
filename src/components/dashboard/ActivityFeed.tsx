import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import type { Activity } from '../../types'
import type { ReactNode } from 'react'
import { PhoneCall, Sparkles, TrendingUp, StickyNote } from 'lucide-react'

type ActivityFeedProps = {
  activities: Activity[]
}

const iconForType: Record<Activity['type'], ReactNode> = {
  call: <PhoneCall className="h-3.5 w-3.5" />,
  deal: <TrendingUp className="h-3.5 w-3.5" />,
  note: <StickyNote className="h-3.5 w-3.5" />,
  pipeline: <Sparkles className="h-3.5 w-3.5" />,
}

const pillClasses: Record<Activity['type'], string> = {
  call: 'bg-[#1e3a5f] text-[#60a5fa]',
  deal: 'bg-[#14532d] text-[#4ade80]',
  note: 'bg-[#4a1942] text-[#f472b6]',
  pipeline: 'bg-[#451a03] text-[#fb923c]',
}

export const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            Activité récente
          </p>
          <p className="mt-1 text-xs text-text-muted">
            Derniers mouvements sur ton pipeline.
          </p>
        </div>
      </div>
      <ol className="space-y-3 text-xs">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="flex items-start gap-3 rounded-lg border border-transparent bg-[#020617]/40 p-2.5 transition duration-200 hover:border-accent-cyan/25"
          >
            <div
              className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full text-[10px] ${pillClasses[activity.type]}`}
            >
              {iconForType[activity.type]}
            </div>
            <div className="flex-1 space-y-0.5">
              <p className="text-[11px] font-medium text-text-primary">
                {activity.title}
              </p>
              <p className="text-[11px] text-text-muted">
                {activity.description}
              </p>
            </div>
            <span className="whitespace-nowrap text-[10px] text-text-muted">
              {formatDistanceToNow(new Date(activity.createdAt), {
                addSuffix: true,
                locale: fr,
              })}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

