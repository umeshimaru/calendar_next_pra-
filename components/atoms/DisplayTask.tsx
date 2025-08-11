import {
  useCalendarDays,
  type CalendarDataProps,
} from '@/hooks/useCalendarDays'
import { ScheduledListContext, ScheduledTodo, Day } from '@/contexts/ScheduledListContext'
import React from 'react'
import { useContext } from 'react'

type DisplayTaskProps = {
  day: Day
  scheduledList: ScheduledTodo
}

type ThisYearType = CalendarDataProps['thisYear']
type ThisMonthType = CalendarDataProps['thisMonth']

export const DisplayTask: React.FC<DisplayTaskProps> = ({
  day,
  scheduledList,
}) => {
  const {
    thisYear,
    thisMonth,
  }: { thisYear: ThisYearType; thisMonth: ThisMonthType } = useCalendarDays()
  const context = useContext(ScheduledListContext)
  if (!context) {
    throw new Error('DisplayTask must be used within ScheduledListContext')
  }
  const { setIsTodoModalOpen, setType, setTodoId } = context
  const currentDate = new Date(thisYear, thisMonth - 1, day)

  // 日付のみで比較するため時間部分を0に設定
  const currentDateOnly = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  )
  const startDateOnly = new Date(
    scheduledList.startDate.getFullYear(),
    scheduledList.startDate.getMonth(),
    scheduledList.startDate.getDate()
  )
  const endDateOnly = new Date(
    scheduledList.endDate.getFullYear(),
    scheduledList.endDate.getMonth(),
    scheduledList.endDate.getDate()
  )

  const openEditModal = (event: React.MouseEvent, id: number) => {
    event.stopPropagation()
    setIsTodoModalOpen(true)
    setType('read')
    setTodoId(() => id)
  }

  return (
    <>
      {currentDateOnly >= startDateOnly && currentDateOnly <= endDateOnly && (
        <div onClick={(event) => openEditModal(event, scheduledList.id)}>
          {scheduledList.todo}
        </div>
      )}
    </>
  )
}
