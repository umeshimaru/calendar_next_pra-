import { ReactNode } from 'react'

type ModalProps = {
  children: ReactNode
  position?: {x: number, y: number} | null
}

const Modal = ({ children, position }: ModalProps) => {
  const positionStyle = position ? {
    position: 'fixed' as const,
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: 1000,
  } : {
    position: 'fixed' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      // モーダルを閉じるロジック（親コンポーネントで管理されているため、カスタムイベントを発火）
      window.dispatchEvent(new CustomEvent('closeModal'))
    }
  }

  return (
    <>
      <div 
        className="fixed inset-0 bg-transparent z-[999]" 
        onClick={handleBackdropClick}
      />
      <div 
        className="bg-white rounded-lg shadow-xl w-80 max-h-[60vh] overflow-y-auto z-[1000]"
        style={positionStyle}
      >
        {children}
      </div>
    </>
  )
}

export default Modal
