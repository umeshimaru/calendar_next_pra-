import { useContext } from 'react'
import { getDaysInMonth } from 'date-fns'
import { YearMonthContextProvider } from '../contexts/YearMonthContext'

export type CalendarDataProps = {
  thisYear: number
  thisMonth: number
  calendarDates: number[]
}

export function useCalendarDays() {
  const context = useContext(YearMonthContextProvider)
  if (!context) {
    throw new Error('コンテキストエラー')
  }

  const { defaultYear, defaultMonth } = context
  const calendarLastDay = getDaysInMonth(
    new Date(defaultYear, defaultMonth - 1)
  )
  const days = Array.from(
    { length: calendarLastDay },
    (_, firstDay) => firstDay + 1
  )

  const calendarDates: number[] = []
  days.forEach((day) => {
    calendarDates.push(day)
  })

  const calendarData: CalendarDataProps = {
    thisYear: defaultYear,
    thisMonth: defaultMonth,
    calendarDates: calendarDates,
  }
  return calendarData
}
