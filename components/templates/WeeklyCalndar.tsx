import CalendarsList from "../organisms/CalendarsList";
import { useCalendarDays, type CalendarDataProps } from "@/hooks/useCalendarDays";
import { ScheduledTodo } from '../organisms/CalendarsList'

type CalendarDatesProp = CalendarDataProps['calendarDates']

type WeeklyCalendarProps = {
  scheduledLists: ScheduledTodo[] | null
  setScheduledLists: React.Dispatch<React.SetStateAction<ScheduledTodo[] | null>>
}

const WeeklyCalendar = ({ scheduledLists, setScheduledLists }: WeeklyCalendarProps) => {
     const { calendarDates }: { calendarDates: CalendarDatesProp } =  useCalendarDays()
  return (
    <div>
      <div>週間です</div>
      {/* ここに週次カレンダーのコンテンツを追加 */}
     <CalendarsList 
       calendarDays={calendarDates} 
       calendarType="week" 
       scheduledLists={scheduledLists}
       setScheduledLists={setScheduledLists}
     />
      {/* 例: 日付ごとのイベントリストなど */}
    </div>
  );
}

export default WeeklyCalendar;