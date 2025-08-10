// components/atoms/Button.tsx（例）
type ButtonProps = {
  title?: string
  icon?: React.ReactNode
  onClick?: () => void
}

const Button = ({ title, icon, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick}>
      {icon && icon}
      {title}
    </button>
  )
}

export default Button
