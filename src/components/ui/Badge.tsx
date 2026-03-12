import type { ReactNode } from 'react'
import type { Niche, Stage } from '../../types'

type BadgeProps = {
  children: ReactNode
  className?: string
}

export const Badge = ({ children, className = '' }: BadgeProps) => {
  return (
    <span className={`badge ${className}`}>
      {children}
    </span>
  )
}

export const stageBadgeClasses: Record<Stage, string> = {
  Prospect: 'bg-[#1f2937] text-[#94a3b8]',
  Appelé: 'bg-[#1e3a5f] text-[#60a5fa]',
  'Démo bookée': 'bg-[#2d1b69] text-[#a78bfa]',
  'Démo faite': 'bg-[#064e3b] text-[#34d399]',
  POC: 'bg-[#451a03] text-[#fb923c]',
  Signé: 'bg-[#14532d] text-[#4ade80]',
  Livré: 'bg-[#052e16] text-[#86efac]',
}

export const nicheBadgeClasses: Record<Niche, string> = {
  Plombier: 'bg-[#1e3a5f] text-[#60a5fa]',
  Électricien: 'bg-[#451a03] text-[#fb923c]',
  Paysagiste: 'bg-[#14532d] text-[#4ade80]',
  Nettoyage: 'bg-[#2d1b69] text-[#a78bfa]',
  Coiffure: 'bg-[#4a1942] text-[#f472b6]',
}

