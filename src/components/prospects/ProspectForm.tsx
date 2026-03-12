import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Prospect, Niche, Stage } from '../../types'

type ProspectFormProps = {
  initial?: Partial<Prospect>
  onSubmit: (prospect: Omit<Prospect, 'id' | 'createdAt'>) => void
}

export const ProspectForm = ({ initial, onSubmit }: ProspectFormProps) => {
  const [form, setForm] = useState<Omit<Prospect, 'id' | 'createdAt'>>({
    name: initial?.name ?? '',
    phone: initial?.phone ?? '',
    region: initial?.region ?? '',
    niche: initial?.niche ?? 'Plombier',
    stage: initial?.stage ?? 'Prospect',
    dealValue: initial?.dealValue ?? 1500,
    assignedTo: initial?.assignedTo ?? 'Moi',
    hasWebsite: initial?.hasWebsite ?? false,
    objection: initial?.objection ?? '',
    lastContact: initial?.lastContact ?? new Date().toISOString(),
    notes: initial?.notes ?? '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-3 text-xs"
    >
      <div className="space-y-1">
        <label className="text-[11px] text-text-muted">Nom</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
        />
      </div>
      <div className="space-y-1">
        <label className="text-[11px] text-text-muted">Téléphone</label>
        <input
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
        />
      </div>
      <div className="space-y-1">
        <label className="text-[11px] text-text-muted">Région</label>
        <input
          value={form.region}
          onChange={(e) => setForm({ ...form, region: e.target.value })}
          className="w-full rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
        />
      </div>
      <div className="space-y-1">
        <label className="text-[11px] text-text-muted">Niche</label>
        <select
          value={form.niche}
          onChange={(e) => setForm({ ...form, niche: e.target.value as Niche })}
          className="w-full rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
        >
          <option value="Plombier">Plombier</option>
          <option value="Électricien">Électricien</option>
          <option value="Paysagiste">Paysagiste</option>
          <option value="Nettoyage">Nettoyage</option>
          <option value="Coiffure">Coiffure</option>
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-[11px] text-text-muted">Étape</label>
        <select
          value={form.stage}
          onChange={(e) => setForm({ ...form, stage: e.target.value as Stage })}
          className="w-full rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
        >
          <option value="Prospect">Prospect</option>
          <option value="Appelé">Appelé</option>
          <option value="Démo bookée">Démo bookée</option>
          <option value="Démo faite">Démo faite</option>
          <option value="POC">POC</option>
          <option value="Signé">Signé</option>
          <option value="Livré">Livré</option>
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-[11px] text-text-muted">Valeur du deal (€)</label>
        <input
          type="number"
          min={0}
          value={form.dealValue}
          onChange={(e) =>
            setForm({ ...form, dealValue: Number.parseInt(e.target.value || '0', 10) })
          }
          className="w-full rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
        />
      </div>
      <div className="space-y-1">
        <label className="text-[11px] text-text-muted">Assigné à</label>
        <select
          value={form.assignedTo}
          onChange={(e) =>
            setForm({ ...form, assignedTo: e.target.value as 'Moi' | 'Associé' })
          }
          className="w-full rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
        >
          <option value="Moi">Moi</option>
          <option value="Associé">Associé</option>
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-[11px] text-text-muted">Objection principale</label>
        <input
          value={form.objection}
          onChange={(e) => setForm({ ...form, objection: e.target.value })}
          className="w-full rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
        />
      </div>
      <div className="col-span-2 space-y-1">
        <label className="text-[11px] text-text-muted">Notes</label>
        <textarea
          rows={3}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full rounded-lg border border-border-subtle bg-[#020617] px-3 py-2 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
        />
      </div>

      <div className="col-span-2 mt-2 flex justify-end gap-2">
        <button
          type="submit"
          className="rounded-lg bg-accent-cyan/10 px-3 py-1.5 text-[11px] font-medium text-accent-cyan hover:bg-accent-cyan/20"
        >
          Enregistrer
        </button>
      </div>
    </form>
  )
}

