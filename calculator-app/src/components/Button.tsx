import { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode | string
  span: boolean
  onClick: () => void
}

const Button = ({ children, span, onClick }: ButtonProps) => {
  return (
    <button
      className={`bg-slate-200/70 hover:bg-slate-200 text-xl rounded-md m-1 ${
        span && "col-span-2"
      }`}
      onClick={onClick}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  span: false,
}
export default Button
