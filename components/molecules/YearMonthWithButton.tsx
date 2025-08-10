import Button from '../atoms/Button'
import { useContext } from 'react'
import { YearMonthContextProvider } from '../../contexts/YearMonthContext'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { addWeeks, startOfWeek } from 'date-fns'

const YearMonthWithButton = () => {
  const context = useContext(YearMonthContextProvider)
  if (!context) {
    throw new Error(
      'YearMonthWithButton must be used within YearMonthContext.Provider'
    )
  }
  const { defaultYear, setDefaultYear, defaultMonth, setDefaultMonth, period, weekStartDate, setWeekStartDate } = context

  const prevMonth = () => {
    if (defaultMonth === 1) {
      setDefaultYear(defaultYear - 1)
      setDefaultMonth(12)
    } else {
      setDefaultMonth(defaultMonth - 1)
    }
  }

  const nextMonth = () => {
    if (defaultMonth === 12) {
      setDefaultYear(defaultYear + 1)
      setDefaultMonth(1)
    } else {
      setDefaultMonth(defaultMonth + 1)
    }
  }

  const prevWeek = () => {
    const currentWeekStart = weekStartDate || startOfWeek(new Date(), { weekStartsOn: 1 })
    const previousWeekStart = addWeeks(currentWeekStart, -1)
    setWeekStartDate(previousWeekStart)
  }

  const nextWeek = () => {
    const currentWeekStart = weekStartDate || startOfWeek(new Date(), { weekStartsOn: 1 })
    const nextWeekStart = addWeeks(currentWeekStart, 1)
    setWeekStartDate(nextWeekStart)
  }

  const handlePrevClick = () => {
    if (period === 'week') {
      prevWeek()
    } else {
      prevMonth()
    }
  }

  const handleNextClick = () => {
    if (period === 'week') {
      nextWeek()
    } else {
      nextMonth()
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button icon={<ChevronLeft />} onClick={handlePrevClick} />
      <p className="text-lg font-medium text-gray-800 px-2">
        {defaultYear}年{defaultMonth}月
      </p>
      <Button icon={<ChevronRight />} onClick={handleNextClick} />
    </div>
  )
}
export default YearMonthWithButton
