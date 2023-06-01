import { ReactNode } from "react"
import { Actions, ActionInterface } from "../reducer"

interface ButtonProps {
  operation: ReactNode | string
  span: boolean
  dispatch: ({ type, payload }: ActionInterface) => void
}

const Operationbutton = ({ operation, span, dispatch }: ButtonProps) => {
  return (
    <button
      className={`bg-slate-200/70 hover:bg-slate-200 text-xl rounded-md m-1 ${
        span && "col-span-2"
      }`}
      onClick={() =>
        dispatch({ type: Actions.CHOOSE_OPERATION, payload: { operation } })
      }>
      {operation}
    </button>
  )
}

Operationbutton.defaultProps = {
  span: false,
}
export default Operationbutton
