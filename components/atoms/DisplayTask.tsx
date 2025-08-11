import { ScheduledListContext, ScheduledTodo, Day } from '@/contexts/ScheduledListContext'
import React from 'react'
import { useContext } from 'react'

type DisplayTaskProps = {
  day: Day
  scheduledList: ScheduledTodo
}

export const DisplayTask: React.FC<DisplayTaskProps> = ({
  day,
  scheduledList,
}) => {
  const context = useContext(ScheduledListContext)
  if (!context) {
    throw new Error('DisplayTask must be used within ScheduledListContext')
  }
  const { setIsTodoModalOpen, setType, setTodoId } = context

  const openEditModal = (event: React.MouseEvent, id: number) => {
    event.stopPropagation()
    setIsTodoModalOpen(true)
    setType('read')
    setTodoId(() => id)
  }

  return (
    <div onClick={(event) => openEditModal(event, scheduledList.id)}>
      {scheduledList.todo}
    </div>
  )
}
