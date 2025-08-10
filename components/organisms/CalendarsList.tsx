'use client'

import { CalendarDataProps } from '../../hooks/useCalendarDays'
import { useState, createContext } from 'react'
import Modal from '../../ui/modal/Modal'
import { DisplayTask } from '../atoms/DisplayTask'
import { Contents } from '../../ui/modal/contents/Contents'

export type ScheduledTodo = {
  id: number
  todo: string
  startDate: Date
  endDate: Date
}

type ScheduledListContextType = {
  scheduledLists: ScheduledTodo[] | null
  setScheduledLists: React.Dispatch<
    React.SetStateAction<ScheduledTodo[] | null>
  >
}

type ModalProps = {
  setIsTodoModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setType: React.Dispatch<React.SetStateAction<ModalType>>
  setTodoId: React.Dispatch<React.SetStateAction<number>>
}
export type Day = number

type ScheduledListContextProviderWithModal = ScheduledListContextType &
  ModalProps & { clickedDay: Day | null } & {
    setClickedDay: React.Dispatch<React.SetStateAction<Day | null>>
  } & { todoId: number } & { todoUniqueId: number } & {
    setUniqueId: React.Dispatch<React.SetStateAction<number>>
  }

export const ScheduledListContext = createContext<
  ScheduledListContextProviderWithModal | undefined
>(undefined)

export const EditContext = createContext<
  | {
      todoId: number
      scheduledLists: ScheduledTodo[] | null
      setScheduledLists: React.Dispatch<
        React.SetStateAction<ScheduledTodo[] | null>
      >
    }
  | undefined
>(undefined)

type CalendarDaysProp = CalendarDataProps['calendarDates']

export type StartDateType = ScheduledTodo['startDate'] //
export type EndDateType = ScheduledTodo['endDate']

export type ModalType = 'create' | 'edit' | 'read' | undefined

const CalendarsList = ({
  calendarDays,
}: {
  calendarDays: CalendarDaysProp
}) => {
  const [TodoModalOpen, setIsTodoModalOpen] = useState<boolean>(false)
  const [scheduledLists, setScheduledLists] = useState<ScheduledTodo[] | null>(
    null
  )
  const [type, setType] = useState<ModalType>(undefined)
  const [clickedDay, setClickedDay] = useState<Day | null>(null)
  const [todoId, setTodoId] = useState<number>(0)
  const [todoUniqueId, setUniqueId] = useState<number>(1)

  console.log(scheduledLists)

  const openModal = (day: Day) => {
    setIsTodoModalOpen(true)
    setType('create')
    setClickedDay(day)
  }

  const weeks = ['月', '火', '水', '木', '金', '土', '日']

  console.log(todoId)

  return (
    <>
      <ScheduledListContext.Provider
        value={{
          scheduledLists,
          setScheduledLists,
          setIsTodoModalOpen,
          setClickedDay,
          setType,
          clickedDay,
          todoId,
          setTodoId,
          todoUniqueId,
          setUniqueId,
        }}
      >
        <EditContext.Provider
          value={{ todoId, scheduledLists, setScheduledLists }}
        >
          {calendarDays.map((day: Day) => (
            <div key={day} onClick={() => openModal(day)}>
              <div>{day}</div>
              {scheduledLists?.map(
                (scheduledList: ScheduledTodo, index: number) => (
                  <div key={`${scheduledList.todo}+${index}`} className="task">
                    <button onClick={() => openModal(day)}>
                      <div>
                        <DisplayTask day={day} scheduledList={scheduledList} />
                      </div>
                    </button>
                  </div>
                )
              )}
            </div>
          ))}
          {TodoModalOpen && (
            <Modal>
              <Contents type={type} />
            </Modal>
          )}
        </EditContext.Provider>
      </ScheduledListContext.Provider>
    </>
  )
}

export default CalendarsList
