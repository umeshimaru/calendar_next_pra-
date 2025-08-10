import CalendarsList from "../organisms/CalendarsList";
import { useCalendarDays, type CalendarDataProps } from "@/hooks/useCalendarDays";


type CalendarDatesProp = CalendarDataProps['calendarDates']

/*************  ✨ Windsurf Command ⭐  *************/
  /**
   * 週次カレンダーのコンポーネント
   *
   *  - 週次カレンダーのコンテンツを描画する
/*******  574ff24f-429b-47c1-9948-cc40ff2f7e5e  *******/const WeeklyCalendar = () => {
     const { calendarDates }: { calendarDates: CalendarDatesProp } =  useCalendarDays()
  return (
    <div>
      <div>週間です</div>
      {/* ここに週次カレンダーのコンテンツを追加 */}
     <CalendarsList calendarDays={calendarDates} calendarType="week" />
      {/* 例: 日付ごとのイベントリストなど */}
    </div>
  );
}

export default WeeklyCalendar;