import { useState } from 'react'
import type { FormEvent } from 'react'
import { Modal } from '../ui/Modal'

type ImportModalProps = {
  isOpen: boolean
  onClose: () => void
  onImport: (items: { name: string; phone: string }[]) => void
}

export const ImportModal = ({ isOpen, onClose, onImport }: ImportModalProps) => {
  const [raw, setRaw] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const lines = raw
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)

    const parsed = lines
      .map((line) => {
        const [name, phone] = line.split(',').map((s) => s.trim())
        if (!name || !phone) return null
        return { name, phone }
      })
      .filter(Boolean) as { name: string; phone: string }[]

    if (parsed.length > 0) {
      onImport(parsed)
      setRaw('')
      onClose()
    }
  }

  return (
    <Modal
      title="Import rapide de prospects"
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-3 text-xs"
      >
        <p className="text-text-muted">
          Collez vos prospects, un par ligne, au format{' '}
          <span className="font-mono-kpi text-[11px] text-text-primary">
            Nom, Téléphone
          </span>
          .
        </p>
        <textarea
          rows={8}
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          className="w-full rounded-lg border border-border-subtle bg-[#020617] px-3 py-2 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
          placeholder="Dupont Plomberie, 0612345678&#10;Électro Martin, 0678123456"
        />
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
            Importer
          </button>
        </div>
      </form>
    </Modal>
  )
}

