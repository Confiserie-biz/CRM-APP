import { useMemo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { differenceInCalendarDays, isToday } from 'date-fns'
import { AlertTriangle, PhoneCall, TrendingDown, TrendingUp, Trophy, Users } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { KPICard } from '../components/ui/KPICard'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Badge, nicheBadgeClasses, stageBadgeClasses } from '../components/ui/Badge'
import { ActivityFeed } from '../components/dashboard/ActivityFeed'
import { RevenueChart } from '../components/dashboard/RevenueChart'
import { HotDealsTable } from '../components/dashboard/HotDealsTable'
import { NicheBreakdown } from '../components/dashboard/NicheBreakdown'
import { revenueByNiche } from '../data/mockData'
import type { Niche, Stage } from '../types'

const NICHE_COLORS = ['#22c55e', '#0ea5e9', '#f97316', '#818cf8', '#ec4899']

const RELANCE_THRESHOLD_DAYS = 3

export const Dashboard = () => {
  const { prospects, calls, monthlyTarget, activities } = useAppContext()

  const {
    signedRevenue,
    pipelineRevenue,
    todaysCalls,
    pendingDemos,
    conversionRate,
    monthlyProgress,
  } = useMemo(() => {
    const signedStages = new Set(['Signé', 'Livré'])
    let signed = 0
    let pipeline = 0
    let total = prospects.length
    let signedCount = 0
    let demos = 0

    for (const p of prospects) {
      if (p.stage === 'Démo bookée') demos++
      if (signedStages.has(p.stage)) {
        signed += p.dealValue
        signedCount++
      } else {
        pipeline += p.dealValue
      }
    }

    const todayCalls = calls.filter((c) => isToday(new Date(c.calledAt))).length
    const conversion = total === 0 ? 0 : (signedCount / total) * 100
    const progress = monthlyTarget === 0 ? 0 : Math.min(100, (signed / monthlyTarget) * 100)

    return {
      signedRevenue: signed,
      pipelineRevenue: pipeline,
      todaysCalls: todayCalls,
      pendingDemos: demos,
      conversionRate: conversion,
      monthlyProgress: progress,
    }
  }, [prospects, calls, monthlyTarget])

  const hotDeals = useMemo(
    () =>
      prospects
        .filter((p) => p.stage === 'Démo faite' || p.stage === 'POC')
        .sort((a, b) => b.dealValue - a.dealValue),
    [prospects],
  )

  const relances = useMemo(() => {
    const now = new Date()
    const excludedStages = new Set(['Signé', 'Livré', 'Prospect'])
    return prospects
      .filter((p) => {
        if (excludedStages.has(p.stage)) return false
        const daysSince = differenceInCalendarDays(now, new Date(p.lastContact))
        return daysSince >= RELANCE_THRESHOLD_DAYS
      })
      .sort((a, b) => {
        const daysA = differenceInCalendarDays(now, new Date(a.lastContact))
        const daysB = differenceInCalendarDays(now, new Date(b.lastContact))
        return daysB - daysA
      })
  }, [prospects])

  const remaining = Math.max(0, monthlyTarget - signedRevenue)

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-text-primary">Vue d'ensemble</h1>
          <p className="text-xs text-text-muted">
            Pilotage temps réel de ton pipeline IA pour services locaux.
          </p>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-5">
        <KPICard
          label="CA signé ce mois"
          value={`${signedRevenue.toLocaleString('fr-FR')} €`}
          accent="green"
          icon={<Trophy className="h-4 w-4" />}
        />
        <KPICard
          label="CA pipeline"
          value={`${pipelineRevenue.toLocaleString('fr-FR')} €`}
          accent="white"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <KPICard
          label="Calls aujourd'hui"
          value={todaysCalls.toString()}
          accent="orange"
          icon={<PhoneCall className="h-4 w-4" />}
        />
        <KPICard
          label="Démos en attente"
          value={pendingDemos.toString()}
          accent="violet"
          icon={<Users className="h-4 w-4" />}
        />
        <KPICard
          label="Taux de conversion"
          value={`${conversionRate.toFixed(1)} %`}
          accent="cyan"
          icon={<TrendingDown className="h-4 w-4 rotate-180" />}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="card card-hover col-span-2 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                Objectif mensuel
              </p>
              <p className="mt-1 text-sm text-text-primary">
                {signedRevenue.toLocaleString('fr-FR')} € /{' '}
                {monthlyTarget.toLocaleString('fr-FR')} €
              </p>
            </div>
            <p className="font-mono-kpi text-sm text-emerald-400">
              Reste {remaining.toLocaleString('fr-FR')} €
            </p>
          </div>
          <ProgressBar value={monthlyProgress} />
          <div className="pt-2">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
              CA signé par niche
            </p>
            <div className="flex items-center gap-6">
              <div className="h-40 w-40 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#020617',
                        border: '1px solid #1f2937',
                        borderRadius: 8,
                        fontSize: 11,
                      }}
                    />
                    <Pie
                      data={revenueByNiche}
                      dataKey="amount"
                      nameKey="niche"
                      cx="50%"
                      cy="50%"
                      outerRadius={62}
                      innerRadius={36}
                      paddingAngle={3}
                    >
                      {revenueByNiche.map((entry, index) => (
                        <Cell key={entry.niche} fill={NICHE_COLORS[index % NICHE_COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="flex-1 grid grid-cols-2 gap-2 text-[11px]">
                {revenueByNiche.map((niche, index) => (
                  <li
                    key={niche.niche}
                    className="flex items-center justify-between rounded-lg border border-border-subtle bg-[#020617]/60 px-3 py-1.5"
                  >
                    <span className="flex items-center gap-2 text-text-muted">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: NICHE_COLORS[index % NICHE_COLORS.length] }}
                      />
                      {niche.niche}
                    </span>
                    <span className="font-mono-kpi text-xs text-text-primary">
                      {niche.amount.toLocaleString('fr-FR')} €
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="card card-hover">
          <ActivityFeed activities={activities.slice(0, 8)} />
        </div>
      </section>

      {/* RELANCES À FAIRE */}
      {relances.length > 0 && (
        <section className="card card-hover space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-400">
              Relances à faire
            </p>
            <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold text-amber-400">
              {relances.length}
            </span>
          </div>
          <p className="text-xs text-text-muted">
            Prospects pas contactés depuis {RELANCE_THRESHOLD_DAYS}+ jours (hors Prospect, Signé, Livré).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border-subtle text-left text-[11px] text-text-muted">
                  <th className="pb-2 pr-4 font-medium">Nom</th>
                  <th className="pb-2 pr-4 font-medium">Niche</th>
                  <th className="pb-2 pr-4 font-medium">Étape</th>
                  <th className="pb-2 pr-4 font-medium">Valeur</th>
                  <th className="pb-2 pr-4 font-medium">Assigné</th>
                  <th className="pb-2 pr-4 font-medium">Dernier contact</th>
                  <th className="pb-2 font-medium">Objection</th>
                </tr>
              </thead>
              <tbody>
                {relances.map((p) => {
                  const daysSince = differenceInCalendarDays(new Date(), new Date(p.lastContact))
                  return (
                    <tr key={p.id} className="border-b border-border-subtle/50">
                      <td className="py-2 pr-4 font-medium text-text-primary">{p.name}</td>
                      <td className="py-2 pr-4">
                        <Badge className={nicheBadgeClasses[p.niche as Niche]}>{p.niche}</Badge>
                      </td>
                      <td className="py-2 pr-4">
                        <Badge className={stageBadgeClasses[p.stage as Stage]}>{p.stage}</Badge>
                      </td>
                      <td className="py-2 pr-4 font-mono-kpi text-emerald-400">
                        {p.dealValue.toLocaleString('fr-FR')} €
                      </td>
                      <td className="py-2 pr-4 text-text-muted">{p.assignedTo}</td>
                      <td className="py-2 pr-4">
                        <span className={`font-medium ${daysSince >= 5 ? 'text-red-400' : 'text-amber-400'}`}>
                          Il y a {daysSince} jours
                        </span>
                      </td>
                      <td className="py-2 text-text-muted">{p.objection || '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]">
        <div className="card card-hover">
          <RevenueChart />
        </div>
        <div className="space-y-4">
          <div className="card card-hover">
            <NicheBreakdown />
          </div>
        </div>
      </section>

      <section className="card card-hover">
        <HotDealsTable
          deals={hotDeals.map((p) => ({
            id: p.id,
            name: p.name,
            niche: p.niche as Niche,
            stage: p.stage as Stage,
            dealValue: p.dealValue,
            assignedTo: p.assignedTo,
            lastContact: p.lastContact,
          }))}
          renderBadges={(p) => (
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge className={nicheBadgeClasses[p.niche as Niche]}>{p.niche}</Badge>
              <Badge className={stageBadgeClasses[p.stage as Stage]}>{p.stage}</Badge>
            </div>
          )}
          relativeDate={(iso) => {
            const d = new Date(iso)
            const diff = differenceInCalendarDays(new Date(), d)
            if (diff === 0) return "Aujourd'hui"
            if (diff === 1) return 'Hier'
            return `Il y a ${diff} jours`
          }}
        />
      </section>
    </div>
  )
}