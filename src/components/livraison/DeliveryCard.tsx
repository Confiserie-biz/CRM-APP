import type { DeliveryData, DeliveryChecklistKey, Prospect } from '../../types'
import { ProgressBar } from '../ui/ProgressBar'

type DeliveryCardProps = {
  prospect: Prospect
  delivery: DeliveryData
  onChange: (updated: DeliveryData) => void
}

const checklistLabels: Record<DeliveryChecklistKey, string> = {
  forkRepo: 'Fork repo GitHub',
  customBranding: 'Customisation logo/couleurs',
  supabaseConfig: 'Config Supabase client',
  openaiKey: 'Clé API OpenAI configurée',
  vercelDeploy: 'Déploiement Vercel',
  onboardingCall: 'Appel onboarding (30-45 min)',
  stripeInvoice: 'Envoi facture Stripe',
  pdfGuide: 'Guide PDF envoyé',
}

export const DeliveryCard = ({ prospect, delivery, onChange }: DeliveryCardProps) => {
  const total = Object.keys(delivery.checklist).length
  const done = Object.values(delivery.checklist).filter(Boolean).length
  const allDone = done === total

  const toggle = (key: DeliveryChecklistKey) => {
    onChange({
      ...delivery,
      checklist: {
        ...delivery.checklist,
        [key]: !delivery.checklist[key],
      },
    })
  }

  return (
    <div className="card card-hover space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-text-primary">
            {prospect.name}
          </p>
          <p className="text-[11px] text-text-muted">
            {prospect.niche} · {prospect.dealValue.toLocaleString('fr-FR')} €
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 text-xs">
          <ProgressBar value={done} max={total} showLabel={false} />
          <p className="text-[11px] text-text-muted">
            {done}/{total} étapes
          </p>
          {allDone && (
            <span className="badge bg-[#14532d] text-[#4ade80]">
              Livré ✓
            </span>
          )}
        </div>
      </div>
      <div className="grid gap-2 text-xs md:grid-cols-2">
        {(Object.keys(delivery.checklist) as DeliveryChecklistKey[]).map((key) => (
          <label
            key={key}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-border-subtle bg-[#020617]/60 px-3 py-1.5 text-[11px] text-text-primary hover:border-accent-cyan/40"
          >
            <input
              type="checkbox"
              checked={delivery.checklist[key]}
              onChange={() => toggle(key)}
              className="h-3.5 w-3.5 rounded border-border-subtle bg-[#020617] text-accent-cyan focus:ring-0"
            />
            {checklistLabels[key]}
          </label>
        ))}
      </div>
      <div className="grid gap-3 text-xs md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.5fr)]">
        <div className="space-y-1">
          <label className="text-[11px] text-text-muted">URL app livrée</label>
          <input
            value={delivery.appUrl}
            onChange={(e) =>
              onChange({
                ...delivery,
                appUrl: e.target.value,
              })
            }
            placeholder="https://client.monsaas.com"
            className="w-full rounded-lg border border-border-subtle bg-[#020617] px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] text-text-muted">Notes internes</label>
          <textarea
            rows={3}
            value={delivery.internalNotes}
            onChange={(e) =>
              onChange({
                ...delivery,
                internalNotes: e.target.value,
              })
            }
            className="w-full rounded-lg border border-border-subtle bg-[#020617] px-3 py-2 text-xs text-text-primary outline-none focus:border-accent-cyan/60"
          />
        </div>
      </div>
    </div>
  )
}

