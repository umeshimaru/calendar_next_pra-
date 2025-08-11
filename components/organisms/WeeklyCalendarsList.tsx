'use client'

import { CalendarDataProps, useCalendarDays } from '../../hooks/useCalendarDays'
import { useState, useEffect, useContext } from 'react'
import Modal from '../../ui/modal/Modal'
import { DisplayTask } from '../atoms/DisplayTask'
import { Contents } from '../../ui/modal/contents/Contents'
import { YearMonthContextProvider } from '../../contexts/YearMonthContext'
import { startOfWeek, addDays } from 'date-fns'
import { ScheduledListContext, EditContext, ScheduledTodo, Day, ModalType } from '@/contexts/ScheduledListContext'


type CalendarDaysProp = CalendarDataProps['calendarDates']

const WeeklyCalendarsList = ({
  calendarDays,
  scheduledLists,
  setScheduledLists,
}: {
  calendarDays: CalendarDaysProp
  scheduledLists: ScheduledTodo[] | null
  setScheduledLists: React.Dispatch<
    React.SetStateAction<ScheduledTodo[] | null>
  >
}) => {
  const [TodoModalOpen, setIsTodoModalOpen] = useState<boolean>(false)
  const [type, setType] = useState<ModalType>(undefined)
  const [clickedDay, setClickedDay] = useState<Day | null>(null)
  const [todoId, setTodoId] = useState<number>(0)
  const [todoUniqueId, setUniqueId] = useState<number>(1)

  const { thisYear, thisMonth } = useCalendarDays()
  const context = useContext(YearMonthContextProvider)

  // 今日の日付を取得
  const today = new Date()
  const todayDay = today.getDate()
  const todayMonth = today.getMonth() + 1
  const todayYear = today.getFullYear()

  console.log(today, todayDay, todayMonth, todayYear, "うんこ")

  const [modalPosition, setModalPosition] = useState<{
    x: number
    y: number
  } | null>(null)

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
    const modalWidth = 320
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    let x = rect.left - modalWidth - 10

    if (x < 10) {
      x = rect.right + 10
    }

    if (x + modalWidth > windowWidth - 10) {
      x = windowWidth - modalWidth - 10
    }

    let y = rect.top
    const modalMaxHeight = windowHeight * 0.6
    if (y + modalMaxHeight > windowHeight - 10) {
      y = windowHeight - modalMaxHeight - 10
    }
    if (y < 10) {
      y = 10
    }

    setModalPosition({
      x: x,
      y: y,
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
          value={{
            todoId,
            scheduledLists,
            setScheduledLists,
            setIsTodoModalOpen,
          }}
        >
          <div className="w-full">
            <div className="flex flex-col bg-white border border-gray-300">
              <div className="grid grid-cols-7 gap-0 border-b border-gray-300">
                {weeks.map((week) => (
                  <div
                    key={week}
                    className="p-3 text-center text-sm font-medium text-gray-600 border-r border-gray-300 last:border-r-0"
                  >
                    {week}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-0">
                {calendarDays.map((day: Day) => {
                  let isToday = false
                  if (context?.weekStartDate) {
                    const weekStart = startOfWeek(context.weekStartDate, {
                      weekStartsOn: 1,
                    })
                    const dayIndex = calendarDays.indexOf(day)
                    const actualDate = addDays(weekStart, dayIndex)
                    isToday =
                      actualDate.getDate() === todayDay &&
                      actualDate.getMonth() + 1 === todayMonth &&
                      actualDate.getFullYear() === todayYear
                  } else {
                    isToday =
                      day === todayDay &&
                      thisMonth === todayMonth &&
                      thisYear === todayYear
                  }

                  return (
                    <div
                      key={day}
                      className="bg-white cursor-pointer p-3 flex flex-col min-h-[120px] transition-colors hover:bg-gray-50 border-r border-b border-gray-300 relative last:border-r-0"
                      onClick={(event) => openModal(day, event)}
                    >
                      <div
                        className={`text-sm font-normal ${isToday ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center mb-1' : 'text-gray-800 mb-2'}`}
                      >
                        {day}
                      </div>
                      <div className="flex-1 flex flex-col gap-1">
                        {scheduledLists?.map(
                          (scheduledList: ScheduledTodo, index: number) => {
                            const { weekStartDate } = context || {}
                            let currentDate

                            if (weekStartDate) {
                              const weekStart = startOfWeek(weekStartDate, {
                                weekStartsOn: 1,
                              })
                              const dayIndex = calendarDays.indexOf(day)
                              currentDate = addDays(weekStart, dayIndex)
                            } else {
                              currentDate = new Date(
                                thisYear,
                                thisMonth - 1,
                                day
                              )
                            }

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

                            console.log('Weekly Calendar Debug:', {
                              day,
                              currentDate: currentDate.toDateString(),
                              startDate:
                                scheduledList.startDate.toDateString(),
                              endDate:
                                scheduledList.endDate.toDateString(),
                              todo: scheduledList.todo,
                            })

                            const isInPeriod =
                              currentDateOnly >= startDateOnly &&
                              currentDateOnly <= endDateOnly
                            const isStartDate =
                              currentDateOnly.getTime() ===
                              startDateOnly.getTime()

                            return isInPeriod ? (
                              <div
                                key={`${scheduledList.todo}+${index}`}
                                className="absolute left-0 right-0 z-10"
                              >
                                <div className="w-full cursor-pointer bg-green-600 text-white px-3 py-1 text-xs leading-4 overflow-hidden text-ellipsis whitespace-nowrap hover:bg-green-700 h-6 flex items-center">
                                  {isStartDate ? (
                                    <DisplayTask
                                      day={day}
                                      scheduledList={scheduledList}
                                    />
                                  ) : (
                                    <div
                                      onClick={(event) => {
                                        event.stopPropagation()
                                      }}
                                    >
                                      &nbsp;
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : null
                          }
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
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

export default WeeklyCalendarsList