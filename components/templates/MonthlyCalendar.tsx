
import CalendarsList from '../organisms/CalendarsList'
import {
  useCalendarDays,
  type CalendarDataProps,
} from '../../hooks/useCalendarDays'

type CalendarDatesProp = CalendarDataProps['calendarDates']

const MonthlyCalendar = () => {
  const { calendarDates }: { calendarDates: CalendarDatesProp } =
    useCalendarDays()

  return (
    <div>
      <CalendarsList calendarDays={calendarDates}  calendarType="month" />
    </div>
  )
}

export default MonthlyCalendar
