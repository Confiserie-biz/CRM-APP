import { useEffect, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'

const APP_PASSWORD = import.meta.env.VITE_APP_PASSWORD || 'crm-demo'

type AuthGateProps = {
  children: ReactNode
}

export const AuthGate = ({ children }: AuthGateProps) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [checked, setChecked] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const flag = window.localStorage.getItem('crm_authenticated')
    if (flag === '1') {
      setAuthenticated(true)
    }
    setChecked(true)
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (password === APP_PASSWORD) {
      setAuthenticated(true)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('crm_authenticated', '1')
      }
      setError('')
    } else {
      setError('Mot de passe incorrect.')
    }
  }

  if (!checked) {
    return null
  }

  if (authenticated) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-main text-text-primary">
      <div className="card card-hover w-full max-w-sm space-y-4 bg-bg-card">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan to-accent-violet shadow-glow-cyan">
            <span className="text-lg font-semibold text-black">AI</span>
            <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-accent-cyan shadow-glow-cyan" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-text-primary">
              CRM IA
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
              Accès restreint
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-3 text-xs"
        >
          <div className="space-y-1">
            <label className="text-[11px] text-text-muted">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-[#020617] px-3 py-2 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p className="text-[11px] text-red-400">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-1 w-full rounded-lg bg-accent-cyan/10 px-3 py-2 text-[11px] font-medium text-accent-cyan hover:bg-accent-cyan/20"
          >
            Entrer dans le CRM
          </button>
          <p className="text-[10px] text-text-muted">
            Astuce : définis ton propre mot de passe dans la variable{' '}
            <span className="font-mono-kpi">VITE_APP_PASSWORD</span>.
          </p>
        </form>
      </div>
    </div>
  )
}

