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
    <form onSubmit={createTodo} className="p-4 w-full">
      <div className="mb-3">
        <input
          name="todo"
          placeholder="予定を入力してください"
          className="w-full border-0 border-b-2 border-gray-300 pb-2 text-base outline-none focus:border-blue-500 transition-colors"
        />
      </div>
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          開始日
        </label>
        <input
          name="startDate"
          type="date"
          className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          終了日
        </label>
        <input
          name="endDate"
          type="date"
          className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          保存
        </button>
      </div>
    </form>
  )
}

export default CreateTodoContents
