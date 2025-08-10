import Header from '../organisms/Header'
import CalendarsList from '../organisms/CalendarsList'
import {
  useCalendarDays,
  type CalendarDataProps,
} from '../../hooks/useCalendarDays'

type CalendarDatesProp = CalendarDataProps['calendarDates']

const Calendar = () => {
  const { calendarDates }: { calendarDates: CalendarDatesProp } =
    useCalendarDays()

  return (
    <div>
      <Header />
      <CalendarsList calendarDays={calendarDates} />
    </div>
  )
}

export default Calendar
