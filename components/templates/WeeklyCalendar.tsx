import {
  useCalendarDays,
  type CalendarDataProps,
} from '@/hooks/useCalendarDays'
import { ScheduledTodo } from '@/contexts/ScheduledListContext'
import WeeklyCalendarsList from '../organisms/WeeklyCalendarsList'



type CalendarDatesProp = CalendarDataProps['calendarDates']

type WeeklyCalendarProps = {
  scheduledLists: ScheduledTodo[] | null
  setScheduledLists: React.Dispatch<
    React.SetStateAction<ScheduledTodo[] | null>
  >
}

const WeeklyCalendar = ({
  scheduledLists,
  setScheduledLists,
}: WeeklyCalendarProps) => {
  const { calendarDates }: { calendarDates: CalendarDatesProp } =
    useCalendarDays()
  return (
    <div>
    <WeeklyCalendarsList
      calendarDays={calendarDates}
      scheduledLists={scheduledLists}
      setScheduledLists={setScheduledLists}
    />
    </div>
  )
}

export default WeeklyCalendar
