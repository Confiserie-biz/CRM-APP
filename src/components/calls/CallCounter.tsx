import { useState } from 'react'
import type { Call } from '../../types'
import { RadialProgress } from '../ui/RadialProgress'

type CallCounterProps = {
  calls: Call[]
  onAddCalls: (count: number) => void
  onAddCallWithResult?: (result: Call['result']) => void
  onRemoveCallWithResult?: (result: Call['result']) => void
}

export const CallCounter = ({ calls, onAddCalls, onAddCallWithResult, onRemoveCallWithResult }: CallCounterProps) => {
  const [manualInput, setManualInput] = useState('')
  const today = new Date()
  const todaysCalls = calls.filter(
    (c) => new Date(c.calledAt).toDateString() === today.toDateString(),
  )
  const breakdown = todaysCalls.reduce(
    (acc, call) => {
      acc[call.result] = (acc[call.result] ?? 0) + 1
      return acc
    },
    {} as Record<Call['result'], number>,
  )
  const total = todaysCalls.length

  const handleSet = () => {
    const n = parseInt(manualInput)
    if (!isNaN(n) && n >= 0) {
      const diff = n - total
      if (diff > 0) onAddCalls(diff)
      setManualInput('')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:items-stretch">
      <div className="flex flex-col items-center gap-3">
        <RadialProgress value={total} />
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
          Calls aujourd'hui
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAddCalls(10)}
            className="rounded-lg border border-border-subtle bg-[#020617]/60 px-3 py-1.5 text-xs text-text-muted hover:text-accent-cyan hover:border-accent-cyan/40 transition-colors"
          >
            ＋10
          </button>
          <button
            onClick={() => onAddCalls(25)}
            className="rounded-lg border border-border-subtle bg-[#020617]/60 px-3 py-1.5 text-xs text-text-muted hover:text-accent-cyan hover:border-accent-cyan/40 transition-colors"
          >
            ＋25
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            placeholder="Ex: 47"
            className="w-20 rounded-lg border border-border-subtle bg-[#020617] px-2 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60 text-center"
          />
          <button
            onClick={handleSet}
            className="rounded-lg bg-accent-cyan/10 px-3 py-1.5 text-xs font-medium text-accent-cyan hover:bg-accent-cyan/20 transition-colors"
          >
            Définir
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-2 text-xs">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
          Breakdown du jour
        </p>
        <div className="grid grid-cols-2 gap-2">
          {(['Intéressé', 'Démo bookée', 'Rappeler', 'Messagerie', 'Pas intéressé'] as Call['result'][]).map((result) => {
            const count = breakdown[result] ?? 0
            return (
              <div key={result} className="flex items-center justify-between rounded-lg border border-border-subtle bg-[#020617]/60 px-3 py-1.5">
                <span className="text-[11px] text-text-muted">{result}</span>
                <div className="flex items-center gap-1.5">
                  {onRemoveCallWithResult && (
                    <button
                      onClick={() => onRemoveCallWithResult(result)}
                      disabled={count === 0}
                      className="flex h-5 w-5 items-center justify-center rounded border border-border-subtle text-[11px] text-text-muted transition-colors hover:border-red-500/40 hover:text-red-400 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:border-border-subtle disabled:hover:text-text-muted"
                    >
                      −
                    </button>
                  )}
                  <span className="font-mono-kpi text-sm text-text-primary w-6 text-center">{count}</span>
                  {onAddCallWithResult && (
                    <button
                      onClick={() => onAddCallWithResult(result)}
                      className="flex h-5 w-5 items-center justify-center rounded border border-border-subtle text-[11px] text-text-muted transition-colors hover:border-accent-cyan/40 hover:text-accent-cyan"
                    >
                      ＋
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}