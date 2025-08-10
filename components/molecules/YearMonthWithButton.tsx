import Button from '../atoms/Button'
import { useContext } from 'react'
import { YearMonthContextProvider } from '../../contexts/YearMonthContext'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const YearMonthWithButton = () => {
  const context = useContext(YearMonthContextProvider)
  if (!context) {
    throw new Error(
      'YearMonthWithButton must be used within YearMonthContext.Provider'
    )
  }
  const { defaultYear, setDefaultYear, defaultMonth, setDefaultMonth } = context

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

  return (
    <div>
      <Button icon={<ChevronLeft />} onClick={prevMonth} />
      <p>
        {defaultYear}年{defaultMonth}月
      </p>
      <Button icon={<ChevronRight />} onClick={nextMonth} />
    </div>
  )
}
export default YearMonthWithButton
