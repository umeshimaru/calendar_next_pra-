'use client'

import { createContext } from 'react'

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
      setIsTodoModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    }
  | undefined
>(undefined)

export type ModalType = 'create' | 'read' | undefined
export type StartDateType = ScheduledTodo['startDate']
export type EndDateType = ScheduledTodo['endDate']