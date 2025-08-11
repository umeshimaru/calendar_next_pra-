import {
  useCalendarDays,
  type CalendarDataProps,
} from '../../hooks/useCalendarDays'
import { ScheduledTodo } from '@/contexts/ScheduledListContext'
import MonthlyCalendarsList from '../organisms/MonthlyCalendarsList'
type CalendarDatesProp = CalendarDataProps['calendarDates']

type MonthlyCalendarProps = {
  scheduledLists: ScheduledTodo[] | null
  setScheduledLists: React.Dispatch<
    React.SetStateAction<ScheduledTodo[] | null>
  >
}

const MonthlyCalendar = ({
  scheduledLists,
  setScheduledLists,
}: MonthlyCalendarProps) => {
  const { calendarDates }: { calendarDates: CalendarDatesProp } =
    useCalendarDays()

  return (
    <div>
      <MonthlyCalendarsList
        calendarDays={calendarDates}

        scheduledLists={scheduledLists}
        setScheduledLists={setScheduledLists}
      />
    </div>
  )
}

export default MonthlyCalendar
