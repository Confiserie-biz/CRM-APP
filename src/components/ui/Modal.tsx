import type { ReactNode } from 'react'
import { X } from 'lucide-react'

type ModalProps = {
  title: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  size?: 'md' | 'lg'
}

export const Modal = ({ title, isOpen, onClose, children, size = 'md' }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className={`card card-hover relative max-h-[90vh] overflow-hidden overflow-y-auto scrollbar-thin ${
          size === 'lg' ? 'w-[720px]' : 'w-[520px]'
        }`}
      >
        <div className="mb-4 flex items-center justify-between gap-4 border-b border-border-subtle pb-3">
          <h2 className="text-sm font-semibold text-text-primary">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border-subtle bg-[#020617] p-1 text-text-muted transition-colors duration-200 hover:border-accent-cyan/40 hover:text-text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  )
}

