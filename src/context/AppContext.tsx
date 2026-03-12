import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Call, DeliveryData, Prospect, Stage } from '../types'
import {
  activities as initialActivities,
  calls as initialCalls,
  initialDeliveryData,
  monthlyTargetDefault,
  prospects as initialProspects,
} from '../data/mockData'

type AppContextValue = {
  prospects: Prospect[]
  setProspects: (updater: (prev: Prospect[]) => Prospect[]) => void
  calls: Call[]
  setCalls: (updater: (prev: Call[]) => Call[]) => void
  activities: typeof initialActivities
  monthlyTarget: number
  setMonthlyTarget: (value: number) => void
  deliveryData: DeliveryData[]
  setDeliveryData: (updater: (prev: DeliveryData[]) => DeliveryData[]) => void
  updateProspectStage: (prospectId: string, stage: Stage) => void
  markContactedToday: (prospectId: string) => void
  addCall: (call: Omit<Call, 'id' | 'calledAt'> & { calledAt?: string }) => void
  removeLastCallByResult: (result: Call['result']) => void
  loading: boolean
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [prospectsState, setProspectsState] = useState<Prospect[]>(() => {
    if (typeof window === 'undefined') return initialProspects
    try {
      const raw = window.localStorage.getItem('crm_prospects')
      if (!raw) return initialProspects
      return JSON.parse(raw) as Prospect[]
    } catch {
      return initialProspects
    }
  })

  const [callsState, setCallsState] = useState<Call[]>(() => {
    if (typeof window === 'undefined') return initialCalls
    try {
      const raw = window.localStorage.getItem('crm_calls')
      if (!raw) return initialCalls
      return JSON.parse(raw) as Call[]
    } catch {
      return initialCalls
    }
  })

  const [monthlyTarget, setMonthlyTarget] = useState<number>(() => {
    if (typeof window === 'undefined') return monthlyTargetDefault
    try {
      const raw = window.localStorage.getItem('crm_monthlyTarget')
      if (!raw) return monthlyTargetDefault
      const value = Number.parseInt(raw, 10)
      return Number.isNaN(value) ? monthlyTargetDefault : value
    } catch {
      return monthlyTargetDefault
    }
  })

  const [deliveryDataState, setDeliveryDataState] = useState<DeliveryData[]>(() => {
    if (typeof window === 'undefined') return initialDeliveryData
    try {
      const raw = window.localStorage.getItem('crm_deliveryData')
      if (!raw) return initialDeliveryData
      return JSON.parse(raw) as DeliveryData[]
    } catch {
      return initialDeliveryData
    }
  })

  const [loading] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem('crm_prospects', JSON.stringify(prospectsState))
    } catch {
      // ignore write errors
    }
  }, [prospectsState])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem('crm_calls', JSON.stringify(callsState))
    } catch {
      // ignore write errors
    }
  }, [callsState])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem('crm_monthlyTarget', String(monthlyTarget))
    } catch {
      // ignore write errors
    }
  }, [monthlyTarget])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem('crm_deliveryData', JSON.stringify(deliveryDataState))
    } catch {
      // ignore write errors
    }
  }, [deliveryDataState])

  const setProspects = (updater: (prev: Prospect[]) => Prospect[]) => {
    setProspectsState((prev) => updater(prev))
  }

  const setCalls = (updater: (prev: Call[]) => Call[]) => {
    setCallsState((prev) => updater(prev))
  }

  const setDeliveryData = (updater: (prev: DeliveryData[]) => DeliveryData[]) => {
    setDeliveryDataState((prev) => updater(prev))
  }

  const updateProspectStage = (prospectId: string, stage: Stage) => {
    setProspects((prev) =>
      prev.map((p) => (p.id === prospectId ? { ...p, stage } : p)),
    )
  }

  const markContactedToday = (prospectId: string) => {
    const today = new Date().toISOString()
    setProspects((prev) =>
      prev.map((p) => (p.id === prospectId ? { ...p, lastContact: today } : p)),
    )
  }

  const addCall = (call: Omit<Call, 'id' | 'calledAt'> & { calledAt?: string }) => {
    const id = `c-${Date.now()}`
    const calledAt = call.calledAt ?? new Date().toISOString()
    const fullCall: Call = { ...call, id, calledAt }
    setCalls((prev) => [fullCall, ...prev])
  }

  const removeLastCallByResult = (result: Call['result']) => {
    const today = new Date()
    setCalls((prev) => {
      const idx = prev.findIndex(
        (c) =>
          c.result === result &&
          new Date(c.calledAt).toDateString() === today.toDateString(),
      )
      if (idx === -1) return prev
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)]
    })
  }

  const value = useMemo<AppContextValue>(
    () => ({
      prospects: prospectsState,
      setProspects,
      calls: callsState,
      setCalls,
      activities: initialActivities,
      monthlyTarget,
      setMonthlyTarget,
      deliveryData: deliveryDataState,
      setDeliveryData,
      updateProspectStage,
      markContactedToday,
      addCall,
      removeLastCallByResult,
      loading,
    }),
    [prospectsState, callsState, monthlyTarget, deliveryDataState, loading],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const ctx = useContext(AppContext)
  if (!ctx) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return ctx
}