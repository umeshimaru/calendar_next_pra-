import { useContext } from 'react'
import { getDaysInMonth, startOfWeek, addDays } from 'date-fns'
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

  const { defaultYear, defaultMonth, period } = context

  if (period === 'week') {
    const currentDate = new Date(defaultYear, defaultMonth - 1)
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }) 
    const weekDays = Array.from({ length: 7 }, (_, i) => 
      addDays(weekStart, i).getDate()
    )
    
    const weeklyDates: CalendarDataProps = {
      thisYear: defaultYear,
      thisMonth: defaultMonth,
      calendarDates: weekDays,
    }
    return weeklyDates
  }


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

  const  monthlyDates: CalendarDataProps = {
    thisYear: defaultYear,
    thisMonth: defaultMonth,
    calendarDates: calendarDates,
  }
  return monthlyDates
}




