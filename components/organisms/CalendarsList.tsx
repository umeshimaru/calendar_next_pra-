'use client'

import { CalendarDataProps } from '../../hooks/useCalendarDays'
import { useState, createContext, useEffect } from 'react'
import Modal from '../../ui/modal/Modal'
import { DisplayTask } from '../atoms/DisplayTask'
import { Contents } from '../../ui/modal/contents/Contents'
import { Period } from '@/contexts/YearMonthContext'

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

type CalendarDaysProp = CalendarDataProps['calendarDates']

export type StartDateType = ScheduledTodo['startDate'] //
export type EndDateType = ScheduledTodo['endDate']

export type ModalType = 'create' | 'read' | undefined

const CalendarsList = ({
  calendarDays,
  calendarType,
  scheduledLists,
  setScheduledLists
}: {
  calendarDays: CalendarDaysProp
  calendarType: Period
  scheduledLists: ScheduledTodo[] | null
  setScheduledLists: React.Dispatch<React.SetStateAction<ScheduledTodo[] | null>>
}) => {
  const [TodoModalOpen, setIsTodoModalOpen] = useState<boolean>(false)
  const [type, setType] = useState<ModalType>(undefined)
  const [clickedDay, setClickedDay] = useState<Day | null>(null)
  const [todoId, setTodoId] = useState<number>(0)
  const [todoUniqueId, setUniqueId] = useState<number>(1)

  console.log(scheduledLists)

  const [modalPosition, setModalPosition] = useState<{x: number, y: number} | null>(null)

  useEffect(() => {
    const handleCloseModal = () => {
      setIsTodoModalOpen(false)
    }

    window.addEventListener('closeModal', handleCloseModal)
    return () => {
      window.removeEventListener('closeModal', handleCloseModal)
    }
  }, [])

  const openModal = (day: Day, event: React.MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    const modalWidth = 320 // w-80 = 20rem = 320px
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    
    // 基本的にクリックした日付の左に配置
    let x = rect.left - modalWidth - 10
    
    // 左に配置して画面外にはみ出る場合は右に配置
    if (x < 10) {
      x = rect.right + 10
    }
    
    // それでも右にはみ出る場合は画面内に収める
    if (x + modalWidth > windowWidth - 10) {
      x = windowWidth - modalWidth - 10
    }
    
    // Y座標も画面内に収める
    let y = rect.top
    const modalMaxHeight = windowHeight * 0.6 // max-h-[60vh]
    if (y + modalMaxHeight > windowHeight - 10) {
      y = windowHeight - modalMaxHeight - 10
    }
    if (y < 10) {
      y = 10
    }
    
    setModalPosition({
      x: x,
      y: y
    })
    setIsTodoModalOpen(true)
    setType('create')
    setClickedDay(day)
  }

  const weeks = ['月', '火', '水', '木', '金', '土', '日']

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
          value={{ todoId, scheduledLists, setScheduledLists,setIsTodoModalOpen }}
        >
          <div className="w-full">
            <div className={calendarType === 'month' ? 
              'grid grid-cols-7 gap-0 border border-gray-300 bg-white' : 
              'flex flex-col bg-white border border-gray-300'
            }>
              {calendarType === 'month' && (
                <div className="col-span-7 grid grid-cols-7 gap-0 bg-gray-50 border-b border-gray-300">
                  {weeks.map(week => (
                    <div key={week} className="py-3 px-4 text-center text-sm font-medium text-gray-600 border-r border-gray-300 last:border-r-0">{week}</div>
                  ))}
                </div>
              )}
              
              {calendarType === 'week' && (
                <>
                  <div className="grid grid-cols-8 gap-0 border-b border-gray-300">
                    <div className="p-3 text-center text-xs text-gray-500 border-r border-gray-300"></div>
                    {weeks.map(week => (
                      <div key={week} className="p-3 text-center text-sm font-medium text-gray-600 border-r border-gray-300 last:border-r-0">{week}</div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-8 gap-0 border-b border-gray-300">
                    <div className="p-3 text-center text-xs text-gray-500 border-r border-gray-300">GMT-04</div>
                    {calendarDays.map((day: Day) => (
                      <div key={day} className="p-3 text-center text-lg font-normal text-gray-800 border-r border-gray-300 last:border-r-0 cursor-pointer hover:bg-gray-50" onClick={(event) => openModal(day, event)}>
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {Array.from({ length: 24 }).map((_, hour) => (
                    <div key={hour} className="grid grid-cols-8 gap-0 border-b border-gray-200 min-h-[40px]">
                      <div className="p-2 text-xs text-gray-500 border-r border-gray-300 text-right">
                        {hour === 0 ? '午前12時' : hour < 12 ? `午前${hour}時` : hour === 12 ? '午後12時' : `午後${hour - 12}時`}
                      </div>
                      {calendarDays.map((day: Day) => (
                        <div key={`${day}-${hour}`} className="border-r border-gray-300 last:border-r-0 cursor-pointer hover:bg-gray-50 relative" onClick={(event) => openModal(day, event)}>
                          {scheduledLists?.map(
                            (scheduledList: ScheduledTodo, index: number) => {
                              const taskDate = new Date(scheduledList.startDate).getDate()
                              return taskDate === day && hour === 9 ? (
                                <div key={`${scheduledList.todo}+${index}`} className="absolute inset-x-1 top-1 bg-green-600 text-white px-2 py-1 rounded text-xs overflow-hidden text-ellipsis whitespace-nowrap hover:bg-green-700">
                                  <DisplayTask day={day} scheduledList={scheduledList} />
                                </div>
                              ) : null
                            }
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </>
              )}
              
              {calendarType === 'month' && calendarDays.map((day: Day, dayIndex: number) => (
                <div key={day} className={`bg-white cursor-pointer p-3 flex flex-col min-h-[120px] transition-colors hover:bg-gray-50 border-r border-b border-gray-300 ${dayIndex % 7 === 6 ? 'border-r-0' : ''}`} onClick={(event) => openModal(day, event)}>
                  <div className="text-sm font-normal text-gray-800 mb-2">{day}</div>
                  <div className="flex-1 flex flex-col gap-1">
                    {scheduledLists?.map(
                      (scheduledList: ScheduledTodo, index: number) => (
                        <div key={`${scheduledList.todo}+${index}`} className="w-full">
                          <div className="w-full cursor-pointer bg-green-600 text-white px-2 py-1 rounded text-xs leading-4 overflow-hidden text-ellipsis whitespace-nowrap hover:bg-green-700">
                            <DisplayTask day={day} scheduledList={scheduledList} />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {TodoModalOpen && (
            <Modal position={modalPosition}>
              <Contents type={type} />
            </Modal>
          )}
        </EditContext.Provider>
      </ScheduledListContext.Provider>
    </>
  )
}

export default CalendarsList
