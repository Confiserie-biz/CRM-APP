import { useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { KanbanBoard } from '../components/pipeline/KanbanBoard'
import type { Niche } from '../types'

export const Pipeline = () => {
  const { prospects } = useAppContext()
  const [nicheFilter, setNicheFilter] = useState<Niche | 'Toutes'>('Toutes')
  const [assignedFilter, setAssignedFilter] = useState<'Tous' | 'Terence' | 'Néo'>('Tous')

  const filteredProspects = useMemo(
    () =>
      prospects.filter((p) => {
        if (nicheFilter !== 'Toutes' && p.niche !== nicheFilter) return false
        if (assignedFilter !== 'Tous' && p.assignedTo !== assignedFilter) return false
        return true
      }),
    [prospects, nicheFilter, assignedFilter],
  )

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-text-primary">Pipeline</h1>
          <p className="text-xs text-text-muted">
            Kanban interactif pour suivre l’avancement de chaque deal.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs">
          <select
            value={nicheFilter}
            onChange={(e) => setNicheFilter(e.target.value as Niche | 'Toutes')}
            className="rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-text-primary outline-none focus:border-accent-cyan/60"
          >
            <option value="Toutes">Toutes les niches</option>
            <option value="Plombier">Plombier</option>
            <option value="Électricien">Électricien</option>
            <option value="Paysagiste">Paysagiste</option>
            <option value="Nettoyage">Nettoyage</option>
            <option value="Coiffure">Coiffure</option>
          </select>
          <select
            value={assignedFilter}
            onChange={(e) =>
              setAssignedFilter(e.target.value as 'Tous' | 'Terence' | 'Néo')
            }
            className="rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-text-primary outline-none focus:border-accent-cyan/60"
          >
            <option value="Tous">Assigné · Tous</option>
            <option value="Terence">Terence</option>
            <option value="Néo">Néo</option>
          </select>
        </div>
      </header>

      <section className="card card-hover">
        <KanbanBoard
          key={`${nicheFilter}-${assignedFilter}`}
          prospects={filteredProspects}
        />
      </section>
    </div>
  )
}

