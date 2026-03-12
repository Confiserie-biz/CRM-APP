import type {
  Activity,
  Call,
  CallResult,
  DeliveryData,
  DeliveryChecklist,
  Niche,
  Prospect,
  Stage,
} from '../types'

const niches: Niche[] = ['Plombier', 'Électricien', 'Paysagiste', 'Nettoyage', 'Coiffure']

const stages: Stage[] = ['Prospect', 'Appelé', 'Démo bookée', 'Démo faite', 'POC', 'Signé', 'Livré']

const baseDate = new Date()

const daysAgo = (n: number) => {
  const d = new Date(baseDate)
  d.setDate(d.getDate() - n)
  return d.toISOString()
}

const randomChoice = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

const createProspect = (
  id: number,
  overrides: Partial<Prospect> = {},
): Prospect => {
  const defaultProspect: Prospect = {
    id: `p-${id}`,
    name: `Prospect ${id}`,
    phone: `06${Math.floor(10000000 + Math.random() * 89999999)}`,
    region: 'Paris',
    niche: randomChoice(niches),
    stage: randomChoice(stages),
    dealValue: 1500,
    assignedTo: Math.random() > 0.5 ? 'Terence' : 'Néo',
    hasWebsite: Math.random() > 0.5,
    objection: '',
    lastContact: daysAgo(Math.floor(Math.random() * 10)),
    notes: '',
    createdAt: daysAgo(Math.floor(Math.random() * 20)),
  }

  return { ...defaultProspect, ...overrides }
}

export const prospects: Prospect[] = [
  {
    id: 'p-1',
    name: 'Dupont Plomberie',
    phone: '0612345678',
    region: 'Paris 15e',
    niche: 'Plombier',
    stage: 'Signé',
    dealValue: 2000,
    assignedTo: 'Terence',
    hasWebsite: true,
    objection: 'Trop cher',
    lastContact: daysAgo(1),
    notes: 'Client très chaud, transformation IA des devis.',
    createdAt: daysAgo(14),
    signedAt: daysAgo(1),
  },
  {
    id: 'p-2',
    name: 'Électro Martin',
    phone: '0678123456',
    region: 'Versailles',
    niche: 'Électricien',
    stage: 'Démo bookée',
    dealValue: 1750,
    assignedTo: 'Néo',
    hasWebsite: false,
    objection: 'Pas le temps',
    lastContact: daysAgo(2),
    notes: 'A besoin d\'automatiser ses devis et relances.',
    createdAt: daysAgo(10),
  },
  {
    id: 'p-3',
    name: 'Jardins Leroy',
    phone: '0655443322',
    region: 'Boulogne',
    niche: 'Paysagiste',
    stage: 'POC',
    dealValue: 2200,
    assignedTo: 'Terence',
    hasWebsite: true,
    objection: 'Déjà un logiciel',
    lastContact: daysAgo(3),
    notes: 'Compare avec un concurrent, focus sur IA pour photos avant/après.',
    createdAt: daysAgo(18),
  },
  {
    id: 'p-4',
    name: 'Clean & Pro Services',
    phone: '0699887766',
    region: 'Saint-Denis',
    niche: 'Nettoyage',
    stage: 'Prospect',
    dealValue: 1400,
    assignedTo: 'Néo',
    hasWebsite: false,
    objection: 'Nul en informatique',
    lastContact: daysAgo(6),
    notes: 'Rassurer sur la simplicité de l\'interface.',
    createdAt: daysAgo(5),
  },
  {
    id: 'p-5',
    name: 'Studio Coiffure Élégance',
    phone: '0622334455',
    region: 'Lyon',
    niche: 'Coiffure',
    stage: 'Appelé',
    dealValue: 1150,
    assignedTo: 'Terence',
    hasWebsite: true,
    objection: '',
    lastContact: daysAgo(0),
    notes: 'Intéressée par les rappels automatiques SMS.',
    createdAt: daysAgo(4),
  },
  createProspect(6, {
    name: 'Plomberie Centrale',
    region: 'Marseille',
    niche: 'Plombier',
    stage: 'Démo faite',
    dealValue: 2100,
    objection: 'Je réfléchis',
  }),
  createProspect(7, {
    name: 'Éclair Élec Services',
    region: 'Nice',
    niche: 'Électricien',
    stage: 'Prospect',
    dealValue: 1600,
  }),
  createProspect(8, {
    name: 'Vert Horizon',
    region: 'Toulouse',
    niche: 'Paysagiste',
    stage: 'Livré',
    dealValue: 2000,
    signedAt: daysAgo(10),
  }),
  createProspect(9, {
    name: 'Nettoyage Express',
    region: 'Montreuil',
    niche: 'Nettoyage',
    stage: 'Signé',
    dealValue: 1500,
    signedAt: daysAgo(8),
  }),
  createProspect(10, {
    name: 'Salon Belle & Chic',
    region: 'Nantes',
    niche: 'Coiffure',
    stage: 'POC',
    dealValue: 1200,
  }),
  createProspect(11, {
    name: 'Plomberie des Ternes',
    region: 'Paris 17e',
    niche: 'Plombier',
    stage: 'Démo faite',
    dealValue: 1900,
  }),
  createProspect(12, {
    name: 'Lumière & Courant',
    region: 'Rennes',
    niche: 'Électricien',
    stage: 'Appelé',
    dealValue: 1700,
  }),
  createProspect(13, {
    name: 'Jardin Prestige',
    region: 'Bordeaux',
    niche: 'Paysagiste',
    stage: 'Prospect',
    dealValue: 2100,
  }),
  createProspect(14, {
    name: 'Clean Office Plus',
    region: 'La Défense',
    niche: 'Nettoyage',
    stage: 'Démo bookée',
    dealValue: 1550,
  }),
  createProspect(15, {
    name: 'Atelier du Cheveu',
    region: 'Strasbourg',
    niche: 'Coiffure',
    stage: 'Appelé',
    dealValue: 1150,
  }),
  createProspect(16, {
    name: 'SOS Fuite Express',
    region: 'Villeurbanne',
    niche: 'Plombier',
    stage: 'Prospect',
    dealValue: 2000,
  }),
  createProspect(17, {
    name: 'Élec Confort',
    region: 'Clermont-Ferrand',
    niche: 'Électricien',
    stage: 'POC',
    dealValue: 1800,
  }),
  createProspect(18, {
    name: 'Paysages & Terrasses',
    region: 'Aix-en-Provence',
    niche: 'Paysagiste',
    stage: 'Signé',
    dealValue: 2050,
    signedAt: daysAgo(5),
  }),
  createProspect(19, {
    name: 'Nettoyage Premium',
    region: 'Lille',
    niche: 'Nettoyage',
    stage: 'Livré',
    dealValue: 1450,
    signedAt: daysAgo(15),
  }),
  createProspect(20, {
    name: 'Coiff&Style',
    region: 'Grenoble',
    niche: 'Coiffure',
    stage: 'Démo faite',
    dealValue: 1200,
  }),
]

const callResults: CallResult[] = ['Intéressé', 'Pas intéressé', 'Rappeler', 'Démo bookée', 'Messagerie']

const createCall = (
  id: number,
  overrides: Partial<Call> = {},
): Call => {
  const prospect = randomChoice(prospects)
  const defaultCall: Call = {
    id: `c-${id}`,
    prospectId: prospect.id,
    prospectName: prospect.name,
    result: randomChoice(callResults),
    note: 'Discussion sur l\'automatisation des devis.',
    assignedTo: Math.random() > 0.5 ? 'Terence' : 'Néo',
    calledAt: daysAgo(Math.floor(Math.random() * 5)),
  }

  return { ...defaultCall, ...overrides }
}

export const calls: Call[] = [
  createCall(1, { result: 'Intéressé', note: 'Veut une démo cette semaine.', calledAt: daysAgo(0) }),
  createCall(2, { result: 'Démo bookée', note: 'Démo bookée mardi 15h.', calledAt: daysAgo(1) }),
  createCall(3, { result: 'Messagerie', note: 'Message vocal laissé.', calledAt: daysAgo(0) }),
  createCall(4, { result: 'Pas intéressé', note: 'Déjà un logiciel concurrent.', calledAt: daysAgo(3) }),
  createCall(5, { result: 'Rappeler', note: 'Rappeler après 18h.', calledAt: daysAgo(2) }),
  createCall(6),
  createCall(7),
  createCall(8),
  createCall(9),
  createCall(10),
  createCall(11),
  createCall(12),
  createCall(13),
  createCall(14),
  createCall(15),
]

export const activities: Activity[] = [
  {
    id: 'a-1',
    type: 'deal',
    title: 'Deal signé - Dupont Plomberie',
    description: 'Contrat annuel 2000€ pour automatisation des devis.',
    createdAt: daysAgo(0),
  },
  {
    id: 'a-2',
    type: 'call',
    title: 'Appel - Électro Martin',
    description: 'Démo bookée pour jeudi 10h.',
    createdAt: daysAgo(1),
  },
  {
    id: 'a-3',
    type: 'pipeline',
    title: 'Jardins Leroy → POC',
    description: 'Fort intérêt, en attente de validation Néoe.',
    createdAt: daysAgo(1),
  },
  {
    id: 'a-4',
    type: 'note',
    title: 'Note - Clean & Pro Services',
    description: 'Important de simplifier le discours technique.',
    createdAt: daysAgo(2),
  },
  {
    id: 'a-5',
    type: 'deal',
    title: 'Deal livré - Vert Horizon',
    description: 'Onboarding terminé, app en production.',
    createdAt: daysAgo(3),
  },
  {
    id: 'a-6',
    type: 'call',
    title: 'Relance - Salon Belle & Chic',
    description: 'Intéressée mais hésite sur le budget.',
    createdAt: daysAgo(3),
  },
  {
    id: 'a-7',
    type: 'pipeline',
    title: 'Nettoyage Express → Signé',
    description: 'A signé après démo centrée sur les plannings.',
    createdAt: daysAgo(4),
  },
  {
    id: 'a-8',
    type: 'note',
    title: 'Note - Atelier du Cheveu',
    description: 'Mettre en avant les rendez-vous récurrents.',
    createdAt: daysAgo(5),
  },
  {
    id: 'a-9',
    type: 'deal',
    title: 'Deal signé - Paysages & Terrasses',
    description: 'Pack premium avec IA pour suggestions d\'aménagement.',
    createdAt: daysAgo(5),
  },
  {
    id: 'a-10',
    type: 'call',
    title: 'Appel - SOS Fuite Express',
    description: 'Très chaud, demande une démo rapide.',
    createdAt: daysAgo(6),
  },
]

export const monthlyTargetDefault = 10000

export const monthlyRevenueByWeek = [
  { week: 'S-3', amount: 3200 },
  { week: 'S-2', amount: 2600 },
  { week: 'S-1', amount: 4100 },
  { week: 'Cette semaine', amount: 1800 },
]

export const revenueByNiche = [
  { niche: 'Plombier', count: 5, amount: 2000 * 2 + 1900 + 2100 + 2000 },
  { niche: 'Électricien', count: 4, amount: 1750 + 1600 + 1700 + 1800 },
  { niche: 'Paysagiste', count: 4, amount: 2200 + 2000 + 2100 + 2050 },
  { niche: 'Nettoyage', count: 4, amount: 1400 + 1500 + 1550 + 1450 },
  { niche: 'Coiffure', count: 3, amount: 1150 + 1200 + 1150 },
]

export const revenueByMonth = [
  { month: 'Jan', amount: 6200 },
  { month: 'Fév', amount: 8400 },
  { month: 'Mar', amount: 9100 },
  { month: 'Avr', amount: 7300 },
  { month: 'Mai', amount: 10500 },
  { month: 'Juin', amount: 8800 },
]

const emptyChecklist = (): DeliveryChecklist => ({
  forkRepo: false,
  customBranding: false,
  supabaseConfig: false,
  openaiKey: false,
  vercelDeploy: false,
  onboardingCall: false,
  stripeInvoice: false,
  pdfGuide: false,
})

export const initialDeliveryData: DeliveryData[] = prospects
  .filter((p) => p.stage === 'Signé' || p.stage === 'Livré')
  .map((p) => ({
    prospectId: p.id,
    checklist: emptyChecklist(),
    appUrl: '',
    internalNotes: '',
  }))