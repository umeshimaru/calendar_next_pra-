import { CreateTodoContents } from './CreateTodoContents'
import type { ModalType } from '@/contexts/ScheduledListContext'
import { ShowTodoContents } from './ShowTodoContents'

export const Contents = ({ type }: { type: ModalType }) => {
  switch (type) {
    case 'create':
      return <CreateTodoContents />
    case 'read':
      return <ShowTodoContents />
  }
}
