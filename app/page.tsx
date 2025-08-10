'use client'

import MonthlyCalendar from '@/components/templates/MonthlyCalendar'

import { useContext, useState } from 'react'
import { getYear, getMonth } from 'date-fns'
import {
  YearMonthContextProvider,
  YearMonthContext,
} from '../contexts/YearMonthContext'
import { Period } from '../contexts/YearMonthContext'
import WeeklyCalendar from '@/components/templates/WeeklyCalndar'
import Header from '@/components/organisms/Header'
import { ScheduledTodo } from '@/components/organisms/CalendarsList'

const now = new Date()
const thisYear = getYear(now)
const thisMonth = getMonth(now) + 1

export default function Home() {
  const [defaultYear, setDefaultYear] = useState<number>(thisYear)
  const [defaultMonth, setDefaultMonth] = useState<number>(thisMonth)
  const [period, setPeriod] = useState<Period>('month')
  const [weekStartDate, setWeekStartDate] = useState<Date | null>(null)
  const [scheduledLists, setScheduledLists] = useState<ScheduledTodo[] | null>(
    null
  )

  return (
    <YearMonthContextProvider.Provider
      value={{
        defaultYear,
        setDefaultYear,
        defaultMonth,
        setDefaultMonth,
        period,
        setPeriod,
        weekStartDate,
        setWeekStartDate,
      }}
    >
      <Header />

      {(() => {
        switch (period) {
          case 'week':
            return (
              <WeeklyCalendar
                scheduledLists={scheduledLists}
                setScheduledLists={setScheduledLists}
              />
            )
          case 'month':
            return (
              <MonthlyCalendar
                scheduledLists={scheduledLists}
                setScheduledLists={setScheduledLists}
              />
            )
        }
      })()}
    </YearMonthContextProvider.Provider>
  )
}
