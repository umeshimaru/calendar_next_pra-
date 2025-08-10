import { CreateTodoContents } from './CreateTodoContents'
import { EditTodoContents } from './EditTodoContents'
import type { ModalType } from '@/components/organisms/CalendarsList'
import { ShowTodoContents } from './ShowTodoContents'

export const Contents = ({ type }: { type: ModalType }) => {
  switch (type) {
    case 'create':
      return <CreateTodoContents />
    case 'edit':
      return <EditTodoContents />
    case 'read':
      return <ShowTodoContents />
  }
}
