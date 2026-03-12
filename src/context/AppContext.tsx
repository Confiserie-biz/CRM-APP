import { createContext, useContext, useMemo, useState } from 'react'
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
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [prospectsState, setProspectsState] = useState<Prospect[]>(initialProspects)
  const [callsState, setCallsState] = useState<Call[]>(initialCalls)
  const [monthlyTarget, setMonthlyTarget] = useState<number>(monthlyTargetDefault)
  const [deliveryDataState, setDeliveryDataState] = useState<DeliveryData[]>(initialDeliveryData)

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
    const id = `c-${callsState.length + 1}-${Date.now()}`
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
    }),
    [prospectsState, callsState, monthlyTarget, deliveryDataState],
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