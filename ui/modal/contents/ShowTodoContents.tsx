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

  const { todoId, scheduledLists, setScheduledLists } = context
  const currentTodo = scheduledLists?.find(
    (todo: ScheduledTodo) => todo.id === todoId
  )

  // const edit = ({e}: {e: React.FormEvent<HTMLFormElement>}) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const todoText = formData.get('todo') as string;
  //   const startDateObj = new Date(formData.get('startDate')as string)
  //   const endDateObj = new Date(formData.get('endDate') as string)
  //   const updatedList = scheduledLists?.map((todo: ScheduledTodo) => {
  //     if (todo.id === todoId) {
  //       return {
  //         ...todo,
  //         todo: todoText,
  //         startDate: startDateObj,
  //         endDate: endDateObj,
  //       };
  //     }
  //     return todo;
  //   });

  // setScheduledLists(updatedList || []);
  // }

  const deleteTodo = () => {
    const updatedList = scheduledLists?.filter(
      (todo: ScheduledTodo) => todo.id !== todoId
    ) // Decrement the unique ID();
    setIsEditing(false)
    setTodoText('')
    setScheduledLists(updatedList || [])
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
  }

  console.log(currentTodo?.startDate)

  return (
    <>
      <div>
        <h1>show</h1>

        {!isEditing && (
          <>
            <button onClick={() => setIsEditing(true)}>編集</button>
            <button onClick={deleteTodo}>削除</button>
          </>
        )}

        {/* タスク名 */}
        <div>
          <h2>タスク名</h2>
          {isEditing ? (
            <input
              type="text"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
            />
          ) : (
            <h2>{currentTodo?.todo}</h2>
          )}
        </div>

        {/* 開始日 */}
        <div>
          <h2>開始日</h2>
          <p>{formatDateToYmd(currentTodo?.startDate)}</p>
        </div>

        {/* 終了日 */}
        <div>
          <h2>終了日</h2>
          <p>{formatDateToYmd(currentTodo?.endDate)}</p>
        </div>

        {isEditing && (
          <>
            <button onClick={saveEdit}>保存</button>
            <button onClick={() => setIsEditing(false)}>キャンセル</button>
          </>
        )}
      </div>
    </>
  )
}
