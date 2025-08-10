'use client'

import Calendar from '../components/templates/Calendar'
import { useState } from 'react'
import { getYear, getMonth } from 'date-fns'
import { YearMonthContextProvider } from '../contexts/YearMonthContext'

const now = new Date()
const thisYear = getYear(now)
const thisMonth = getMonth(now) + 1

export default function Home() {
  const [defaultYear, setDefaultYear] = useState<number>(thisYear)
  const [defaultMonth, setDefaultMonth] = useState<number>(thisMonth)

  return (
    <YearMonthContextProvider.Provider
      value={{ defaultYear, setDefaultYear, defaultMonth, setDefaultMonth }}
    >
      <Calendar />
    </YearMonthContextProvider.Provider>
  )
}
