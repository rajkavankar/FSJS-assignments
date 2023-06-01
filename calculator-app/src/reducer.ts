import { ReactNode } from "react"

export enum Actions {
  ADD_DIGIT = "add-digit",
  DELETE_DIGIT = "delete-digit",
  CLEAR = "clear",
  CHOOSE_OPERATION = "choose-operation",
  EVALUATE = "evaluate",
}

export interface ActionInterface {
  type: Actions
  payload: {
    digit?: string | ReactNode
    operation?: string | ReactNode
  }
}

export interface StateInterface {
  previousOprand: string
  operation: string
  currentOprand: string
  overwrite?: boolean
}

const evaluate = ({
  previousOprand,
  operation,
  currentOprand,
}: StateInterface) => {
  const prev: number = parseFloat(previousOprand)
  const current: number = parseFloat(currentOprand)

  if (isNaN(prev) || isNaN(current)) {
    return ""
  }

  let result: number | string = ""

  switch (operation) {
    case "+":
      result = prev + current
      break
    case "-":
      result = prev - current
      break
    case "*":
      result = prev * current
      break
    case "/":
      result = prev / current
      break

    default:
      break
  }

  return result.toString()
}

const NumberFormatter = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

export const formatter = (oprand: string) => {
  if (oprand == null) {
    return
  }
  const [integer, decimal] = oprand.split(".")
  const num = Number(integer)
  if (decimal == null) {
    return NumberFormatter.format(num)
  } else {
    return `${NumberFormatter.format(num)}.${decimal}`
  }
}

export default (
  state: StateInterface,
  { type, payload }: ActionInterface
): StateInterface | string => {
  switch (type) {
    case Actions.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOprand: payload.digit,
          overwrite: false,
        }
      } else if (payload.digit === "0" && state.currentOprand === "0") {
        return state
      } else if (payload.digit === "." && state.currentOprand.includes(".")) {
        return state
      } else {
        return {
          ...state,
          currentOprand: `${state.currentOprand || ""}${payload.digit}`,
        }
      }

    case Actions.CHOOSE_OPERATION:
      if (state.currentOprand == null && state.previousOprand == null) {
        return state
      } else if (state.previousOprand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOprand: state.currentOprand,
          currentOprand: null,
        }
      } else if (state.currentOprand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      } else {
        return {
          ...state,
          previousOprand: evaluate(state),
          operation: payload.operation,
          currentOprand: null,
        }
      }

    case Actions.CLEAR:
      return {}

    case Actions.EVALUATE:
      if (
        state.previousOprand == null ||
        state.currentOprand == null ||
        state.operation == null
      ) {
        return ""
      } else {
        return {
          ...state,
          overwrite: true,
          previousOprand: null,
          operation: null,
          currentOprand: evaluate(state),
        }
      }

    case Actions.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOprand: null,
          overwrite: false,
        }
      } else if (state.currentOprand == null) {
        return state
      } else if (state.currentOprand.length == 1) {
        return {
          ...state,
          currentOprand: null,
        }
      } else {
        return {
          ...state,
          currentOprand: state.currentOprand.slice(0, -1),
        }
      }

    default:
      return state
  }
}
