'use client'

import { createContext } from 'react'

export type YearMonthContext = {
  defaultYear: number
  setDefaultYear: React.Dispatch<React.SetStateAction<number>>
  defaultMonth: number
  setDefaultMonth: React.Dispatch<React.SetStateAction<number>>
}

export const YearMonthContextProvider = createContext<
  YearMonthContext | undefined
>(undefined)
