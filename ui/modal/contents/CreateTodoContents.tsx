import React, { useContext, useState } from 'react'
import { ScheduledListContext } from '@/components/organisms/CalendarsList'
import { set } from 'date-fns'

export const CreateTodoContents = () => {
  const context = useContext(ScheduledListContext)

  if (!context) {
    throw new Error(
      'CreateTodoContents must be used within ScheduledListContext'
    )
  }

  const {
    scheduledLists,
    setScheduledLists,
    setIsTodoModalOpen,
    setUniqueId,
    todoUniqueId,
  } = context

  const createTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const todo = formData.get('todo') as string
    const startDateObj = new Date(formData.get('startDate') as string)
    const endDateObj = new Date(formData.get('endDate') as string)
    console.log(startDateObj)

    console.log(scheduledLists)
    setScheduledLists([
      ...(scheduledLists || []),
      {
        id: todoUniqueId, // Use a unique ID for each todo
        todo,
        startDate: startDateObj,
        endDate: endDateObj,
      },
    ])
    setIsTodoModalOpen(false)
    setUniqueId((prevId) => prevId + 1) // Increment the unique ID for the next todo
  }

  return (
    <form onSubmit={createTodo}>
      <input name="todo" placeholder="予定を入力してください" />
      <input name="startDate" type="date" />
      <input name="endDate" type="date" />
      <button type="submit">送信</button>
    </form>
  )
}

export default CreateTodoContents
