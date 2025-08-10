'use client'

import { createContext } from 'react'

export type Period = 'month' | 'week'

export type YearMonthContext = {
  defaultYear: number
  setDefaultYear: React.Dispatch<React.SetStateAction<number>>
  defaultMonth: number
  setDefaultMonth: React.Dispatch<React.SetStateAction<number>>
  period: Period
  setPeriod: React.Dispatch<React.SetStateAction<Period>>
  weekStartDate: Date | null
  setWeekStartDate: React.Dispatch<React.SetStateAction<Date | null>>
}

export const YearMonthContextProvider = createContext<
  YearMonthContext | undefined
>(undefined)
