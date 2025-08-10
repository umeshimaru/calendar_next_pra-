import { useContext } from 'react'
import {
  EditContext,
  type ScheduledTodo,
} from '../../../components/organisms/CalendarsList'
import { formatDateToYmd } from '@/utils/formatDateToYmd'

export const EditTodoContents = () => {
  const context = useContext(EditContext)
  if (!context) {
    return <div>エラー: コンテキストが存在しません</div>
  }

  const { todoId, scheduledLists, setScheduledLists } = context
  const currentTodo = scheduledLists?.find(
    (todo: ScheduledTodo) => todo.id === todoId
  )
  console.log(currentTodo?.startDate)

  const edit = ({ e }: { e: React.FormEvent<HTMLFormElement> }) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const todoText = formData.get('todo') as string
    const startDateObj = new Date(formData.get('startDate') as string)
    const endDateObj = new Date(formData.get('endDate') as string)
    const updatedList = scheduledLists?.map((todo: ScheduledTodo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          todo: todoText,
          startDate: startDateObj,
          endDate: endDateObj,
        }
      }
      return todo
    })

    setScheduledLists(updatedList || [])
  }

  return (
    <>
      <div>
        <h1>編集</h1>

        <form action="#" onSubmit={(e) => edit({ e })}>
          <label htmlFor="todo">
            <input
              id="todo"
              name="todo"
              type="text"
              defaultValue={currentTodo?.todo}
            />
          </label>
          <label htmlFor="startDate">
            <input
              id="startDate"
              name="startDate"
              type="date"
              defaultValue={formatDateToYmd(currentTodo?.startDate)}
            />
          </label>
          <label htmlFor="endDate">
            <input
              id="endDate"
              name="endDate"
              type="date"
              defaultValue={formatDateToYmd(currentTodo?.endDate)}
            />
          </label>
          <button type="submit">完了</button>
        </form>
      </div>
    </>
  )
}
