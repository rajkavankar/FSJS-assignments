import { createContext, useReducer } from "react"
import reducer from "../todoreducer"
export const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, [])
  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  )
}
