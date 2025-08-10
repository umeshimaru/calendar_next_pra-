import YearMonthWithButton from '../molecules/YearMonthWithButton'
import { DateRangeSelector } from '../atoms/DateRangeSelector'

const Header = () => {
  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white border-b border-gray-200">
      <YearMonthWithButton />
      <DateRangeSelector />
    </div>
  )
}
export default Header
