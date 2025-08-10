
import CalendarsList from '../organisms/CalendarsList'
import {
  useCalendarDays,
  type CalendarDataProps,
} from '../../hooks/useCalendarDays'
import { ScheduledTodo } from '../organisms/CalendarsList'

type CalendarDatesProp = CalendarDataProps['calendarDates']

type MonthlyCalendarProps = {
  scheduledLists: ScheduledTodo[] | null
  setScheduledLists: React.Dispatch<React.SetStateAction<ScheduledTodo[] | null>>
}

const MonthlyCalendar = ({ scheduledLists, setScheduledLists }: MonthlyCalendarProps) => {
  const { calendarDates }: { calendarDates: CalendarDatesProp } =
    useCalendarDays()

  return (
    <div className="ml-[200px]">
      <CalendarsList 
        calendarDays={calendarDates} 
        calendarType="month" 
        scheduledLists={scheduledLists}
        setScheduledLists={setScheduledLists}
      />
    </div>
  )
}

export default MonthlyCalendar
