import { useState } from 'react'
import type { FormEvent } from 'react'
import { Modal } from '../ui/Modal'
import type { CallResult } from '../../types'

type LogCallModalProps = {
  isOpen: boolean
  onClose: () => void
  prospects: { id: string; name: string }[]
  onSubmit: (data: {
    prospectId: string | null
    prospectName: string
    result: CallResult
    note: string
    assignedTo: 'Moi' | 'Associé'
  }) => void
}

export const LogCallModal = ({ isOpen, onClose, prospects, onSubmit }: LogCallModalProps) => {
  const [prospectId, setProspectId] = useState<string | 'autre'>('autre')
  const [prospectName, setProspectName] = useState('')
  const [result, setResult] = useState<CallResult>('Intéressé')
  const [note, setNote] = useState('')
  const [assignedTo, setAssignedTo] = useState<'Moi' | 'Associé'>('Moi')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const selected =
      prospectId !== 'autre'
        ? prospects.find((p) => p.id === prospectId)
        : null
    const finalName = selected?.name ?? prospectName
    if (!finalName) return
    onSubmit({
      prospectId: selected?.id ?? null,
      prospectName: finalName,
      result,
      note,
      assignedTo,
    })
    setProspectId('autre')
    setProspectName('')
    setResult('Intéressé')
    setNote('')
    setAssignedTo('Moi')
    onClose()
  }

  return (
    <Modal
      title="Logger un call"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-3 text-xs"
      >
        <div className="space-y-1">
          <label className="text-[11px] text-text-muted">Prospect</label>
          <select
            value={prospectId}
            onChange={(e) => setProspectId(e.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
          >
            <option value="autre">Saisie libre</option>
            {prospects.map((p) => (
              <option
                key={p.id}
                value={p.id}
              >
                {p.name}
              </option>
            ))}
          </select>
        </div>
        {prospectId === 'autre' && (
          <div className="space-y-1">
            <label className="text-[11px] text-text-muted">Nom du prospect</label>
            <input
              value={prospectName}
              onChange={(e) => setProspectName(e.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
            />
          </div>
        )}
        <div className="space-y-1">
          <label className="text-[11px] text-text-muted">Résultat</label>
          <select
            value={result}
            onChange={(e) => setResult(e.target.value as CallResult)}
            className="w-full rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
          >
            <option value="Intéressé">Intéressé</option>
            <option value="Pas intéressé">Pas intéressé</option>
            <option value="Rappeler">Rappeler</option>
            <option value="Démo bookée">Démo bookée</option>
            <option value="Messagerie">Messagerie</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[11px] text-text-muted">Note</label>
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-[#020617] px-3 py-2 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] text-text-muted">Assigné à</label>
          <select
            value={assignedTo}
            onChange={(e) =>
              setAssignedTo(e.target.value as 'Moi' | 'Associé')
            }
            className="w-full rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
          >
            <option value="Moi">Moi</option>
            <option value="Associé">Associé</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border-subtle px-3 py-1.5 text-[11px] text-text-muted hover:border-accent-cyan/40 hover:text-text-primary"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="rounded-lg bg-accent-cyan/10 px-3 py-1.5 text-[11px] font-medium text-accent-cyan hover:bg-accent-cyan/20"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </Modal>
  )
}

