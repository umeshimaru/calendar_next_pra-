'use client'

import MonthlyCalendar from '@/components/templates/MonthlyCalendar'

import { useContext, useState } from 'react'
import { getYear, getMonth } from 'date-fns'
import { YearMonthContextProvider, YearMonthContext } from '../contexts/YearMonthContext'
import { Period } from '../contexts/YearMonthContext'
import WeeklyCalendar from '@/components/templates/WeeklyCalndar'
import Header from '@/components/organisms/Header'

const now = new Date()
const thisYear = getYear(now)
const thisMonth = getMonth(now) + 1





export default function Home() {


  const [defaultYear, setDefaultYear] = useState<number>(thisYear)
  const [defaultMonth, setDefaultMonth] = useState<number>(thisMonth)
   const [period, setPeriod] = useState<Period>("month");


  return (
    <YearMonthContextProvider.Provider
      value={{ defaultYear, setDefaultYear, defaultMonth, setDefaultMonth,period, setPeriod }}
    >
    <Header />

 {(() => {
      switch (period) {
        case 'week':
          return <WeeklyCalendar />;
        case 'month':
          return <MonthlyCalendar/>;
      }
    })()}
    </YearMonthContextProvider.Provider>
  )
}
