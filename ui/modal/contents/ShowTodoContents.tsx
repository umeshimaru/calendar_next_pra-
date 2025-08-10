'use client'

import React, { useContext, useState } from 'react'
import {
  EditContext,
  type ScheduledTodo,
} from '../../../components/organisms/CalendarsList'
import { formatDateToYmd } from '@/utils/formatDateToYmd'

export const ShowTodoContents = () => {
  console.log('show')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [todoText, setTodoText] = useState<string>('')

  const context = useContext(EditContext)

  if (!context) {
    return <div>エラー: コンテキストが存在しません</div>
  }

  const { todoId, scheduledLists, setScheduledLists, setIsTodoModalOpen } =
    context
  const currentTodo = scheduledLists?.find(
    (todo: ScheduledTodo) => todo.id === todoId
  )

  const deleteTodo = () => {
    const updatedList = scheduledLists?.filter(
      (todo: ScheduledTodo) => todo.id !== todoId
    ) // Decrement the unique ID();
    setIsEditing(false)
    setTodoText('')
    setScheduledLists(updatedList || [])
    setIsTodoModalOpen(false) // Close the modal after deletion
  }

  // 保存処理
  const saveEdit = () => {
    const updatedList = scheduledLists?.map((todo: ScheduledTodo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          todo: todoText,
          startDate: todo.startDate, // ここは編集しないのでそのまま
          endDate: todo.endDate, // ここは編集しないのでそのまま
        }
      }

      return todo
    })

    setScheduledLists(updatedList || [])
    setIsEditing(false)
    setIsTodoModalOpen(false)
  }

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-800">予定詳細</h1>
        {!isEditing && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
            >
              編集
            </button>
            <button
              onClick={deleteTodo}
              className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              削除
            </button>
          </div>
        )}
      </div>

      {/* タスク名 */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          タスク名
        </label>
        {isEditing ? (
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            className="w-full border-0 border-b-2 border-gray-300 pb-2 text-base outline-none focus:border-blue-500 transition-colors"
            placeholder={currentTodo?.todo}
          />
        ) : (
          <p className="text-base text-gray-800 pb-2 border-b border-gray-200">
            {currentTodo?.todo}
          </p>
        )}
      </div>

      {/* 開始日 */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          開始日
        </label>
        <p className="text-sm text-gray-600 py-1.5">
          {formatDateToYmd(currentTodo?.startDate)}
        </p>
      </div>

      {/* 終了日 */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          終了日
        </label>
        <p className="text-sm text-gray-600 py-1.5">
          {formatDateToYmd(currentTodo?.endDate)}
        </p>
      </div>

      {isEditing && (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={saveEdit}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            保存
          </button>
        </div>
      )}
    </div>
  )
}
