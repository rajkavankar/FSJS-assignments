import { ReactNode } from "react"
import { Actions, ActionInterface } from "../reducer"

interface ButtonProps {
  digit: ReactNode | string | number
  span: boolean
  dispatch: ({ type, payload }: ActionInterface) => void
}

const Digitbutton = ({ digit, span, dispatch }: ButtonProps) => {
  return (
    <button
      className={`bg-slate-200/70 hover:bg-slate-200 text-xl rounded-md m-1 ${
        span && "col-span-2"
      }`}
      onClick={() => dispatch({ type: Actions.ADD_DIGIT, payload: { digit } })}>
      {digit}
    </button>
  )
}

Digitbutton.defaultProps = {
  span: false,
}
export default Digitbutton
