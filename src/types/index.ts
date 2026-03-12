export type Niche = 'Plombier' | 'Électricien' | 'Paysagiste' | 'Nettoyage' | 'Coiffure'

export type Stage =
  | 'Prospect'
  | 'Appelé'
  | 'Démo bookée'
  | 'Démo faite'
  | 'POC'
  | 'Signé'
  | 'Livré'

export type Prospect = {
  id: string
  name: string
  phone: string
  region: string
  niche: Niche
  stage: Stage
  dealValue: number
  assignedTo: 'Terence' | 'Néo'
  hasWebsite: boolean
  objection: string
  lastContact: string
  notes: string
  createdAt: string
  signedAt?: string
}

export type CallResult = 'Intéressé' | 'Pas intéressé' | 'Rappeler' | 'Démo bookée' | 'Messagerie'

export type Call = {
  id: string
  prospectId: string | null
  prospectName: string
  result: CallResult
  note: string
  assignedTo: 'Terence' | 'Néo'
  calledAt: string
}

export type Activity = {
  id: string
  type: 'call' | 'deal' | 'note' | 'pipeline'
  title: string
  description: string
  createdAt: string
}

export type DeliveryChecklistKey =
  | 'forkRepo'
  | 'customBranding'
  | 'supabaseConfig'
  | 'openaiKey'
  | 'vercelDeploy'
  | 'onboardingCall'
  | 'stripeInvoice'
  | 'pdfGuide'

export type DeliveryChecklist = Record<DeliveryChecklistKey, boolean>

export type DeliveryData = {
  prospectId: string
  checklist: DeliveryChecklist
  appUrl: string
  internalNotes: string
}