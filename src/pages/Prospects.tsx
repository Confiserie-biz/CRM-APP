import { useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import type { Prospect } from '../types'
import { ProspectsTable } from '../components/prospects/ProspectsTable'
import { Modal } from '../components/ui/Modal'
import { ProspectForm } from '../components/prospects/ProspectForm'
import { ImportModal } from '../components/prospects/ImportModal'

export const Prospects = () => {
  const { prospects, setProspects } = useAppContext()
  const [search, setSearch] = useState('')
  const [nicheFilter, setNicheFilter] = useState<'Toutes' | Prospect['niche']>('Toutes')
  const [stageFilter, setStageFilter] = useState<'Toutes' | Prospect['stage']>('Toutes')
  const [assignedFilter, setAssignedFilter] = useState<'Tous' | 'Terence' | 'Néo'>('Tous')
  const [editing, setEditing] = useState<Prospect | null>(null)
  const [isNewOpen, setIsNewOpen] = useState(false)
  const [isImportOpen, setIsImportOpen] = useState(false)
   const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const filtered = useMemo(
    () =>
      prospects.filter((p) => {
        const term = search.toLowerCase()
        if (
          term &&
          !(
            p.name.toLowerCase().includes(term) ||
            p.phone.toLowerCase().includes(term) ||
            p.region.toLowerCase().includes(term)
          )
        ) {
          return false
        }
        if (nicheFilter !== 'Toutes' && p.niche !== nicheFilter) return false
        if (stageFilter !== 'Toutes' && p.stage !== stageFilter) return false
        if (assignedFilter !== 'Tous' && p.assignedTo !== assignedFilter) return false
        return true
      }),
    [prospects, search, nicheFilter, stageFilter, assignedFilter],
  )

  const sorted = useMemo(
    () =>
      [...filtered].sort((a, b) => {
        const da = new Date(a.createdAt).getTime()
        const db = new Date(b.createdAt).getTime()
        return sortDirection === 'asc' ? da - db : db - da
      }),
    [filtered, sortDirection],
  )

  const openEdit = (p: Prospect) => {
    setEditing(p)
  }

  const handleSave = (partial: Omit<Prospect, 'id' | 'createdAt'>) => {
    if (editing) {
      setProspects((prev) =>
        prev.map((p) => (p.id === editing.id ? { ...p, ...partial } : p)),
      )
      setEditing(null)
    } else {
      const id = `p-${Date.now()}`
      const createdAt = new Date().toISOString()
      setProspects((prev) => [...prev, { ...partial, id, createdAt }])
      setIsNewOpen(false)
    }
  }

  const handleDelete = (prospect: Prospect) => {
    setProspects((prev) => prev.filter((p) => p.id !== prospect.id))
  }

  const handleImport = (items: { name: string; phone: string }[]) => {
    const now = new Date().toISOString()
    setProspects((prev) => [
      ...prev,
      ...items.map((item, index) => ({
        id: `p-import-${Date.now()}-${index}`,
        name: item.name,
        phone: item.phone,
        region: 'À renseigner',
        niche: 'Plombier' as const,
        stage: 'Prospect' as const,
        dealValue: 1500,
        assignedTo: 'Terence' as const,
        hasWebsite: false,
        objection: '',
        lastContact: now,
        notes: '',
        createdAt: now,
      })),
    ])
  }

  const exportCsv = () => {
    const header = [
      'Nom',
      'Téléphone',
      'Région',
      'Niche',
      'Étape',
      'Valeur',
      'Assigné',
      'Objection',
    ]
    const lines = filtered.map((p) =>
      [
        p.name,
        p.phone,
        p.region,
        p.niche,
        p.stage,
        p.dealValue,
        p.assignedTo,
        p.objection ?? '',
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(','),
    )
    const csv = [header.join(','), ...lines].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'prospects.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-text-primary">Prospects</h1>
          <p className="text-xs text-text-muted">
            Base complète de tes leads, filtres temps réel et import/export.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setIsNewOpen(true)}
            className="rounded-lg bg-accent-cyan/10 px-3 py-1.5 text-[11px] font-medium text-accent-cyan hover:bg-accent-cyan/20"
          >
            ＋ Nouveau prospect
          </button>
          <button
            type="button"
            onClick={() => setIsImportOpen(true)}
            className="rounded-lg border border-border-subtle px-3 py-1.5 text-[11px] text-text-muted hover:border-accent-cyan/40 hover:text-text-primary"
          >
            Import rapide
          </button>
          <button
            type="button"
            onClick={exportCsv}
            className="rounded-lg border border-border-subtle px-3 py-1.5 text-[11px] text-text-muted hover:border-accent-cyan/40 hover:text-text-primary"
          >
            Export CSV
          </button>
        </div>
      </header>

      <section className="card card-hover space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <input
            placeholder="Recherche globale (nom, téléphone, région)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-[220px] flex-1 rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
          />
          <div className="flex flex-wrap gap-2">
            <select
              value={nicheFilter}
              onChange={(e) =>
                setNicheFilter(e.target.value as 'Toutes' | Prospect['niche'])
              }
              className="rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
            >
              <option value="Toutes">Niche · Toutes</option>
              <option value="Plombier">Plombier</option>
              <option value="Électricien">Électricien</option>
              <option value="Paysagiste">Paysagiste</option>
              <option value="Nettoyage">Nettoyage</option>
              <option value="Coiffure">Coiffure</option>
            </select>
            <select
              value={stageFilter}
              onChange={(e) =>
                setStageFilter(e.target.value as 'Toutes' | Prospect['stage'])
              }
              className="rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
            >
              <option value="Toutes">Étape · Toutes</option>
              <option value="Prospect">Prospect</option>
              <option value="Appelé">Appelé</option>
              <option value="Démo bookée">Démo bookée</option>
              <option value="Démo faite">Démo faite</option>
              <option value="POC">POC</option>
              <option value="Signé">Signé</option>
              <option value="Livré">Livré</option>
            </select>
            <select
              value={assignedFilter}
              onChange={(e) =>
                setAssignedFilter(e.target.value as 'Tous' | 'Terence' | 'Néo')
              }
              className="rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
            >
              <option value="Tous">Assigné · Tous</option>
              <option value="Terence">Terence</option>
              <option value="Néo">Néo</option>
            </select>
            <button
              type="button"
              onClick={() =>
                setSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'))
              }
              className="rounded-lg border border-border-subtle px-3 py-1.5 text-[11px] text-text-muted hover:border-accent-cyan/40 hover:text-text-primary"
            >
              Tri&nbsp;:{' '}
              {sortDirection === 'desc'
                ? 'Plus récent → ancien'
                : 'Plus ancien → récent'}
            </button>
          </div>
        </div>

        <ProspectsTable
          prospects={sorted}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </section>

      <Modal
        title={editing ? 'Éditer le prospect' : 'Nouveau prospect'}
        isOpen={isNewOpen || !!editing}
        onClose={() => {
          setIsNewOpen(false)
          setEditing(null)
        }}
      >
        <ProspectForm
          initial={editing ?? undefined}
          onSubmit={handleSave}
        />
      </Modal>

      <ImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImport={handleImport}
      />
    </div>
  )
}

