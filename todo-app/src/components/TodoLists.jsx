import { ListGroup } from "react-bootstrap"
import TodoItem from "./TodoItem"
import { TodoContext } from "../context/todoContext"
import { useContext } from "react"

const TodoLists = () => {
  const { todos } = useContext(TodoContext)
  return (
    <ListGroup>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ListGroup>
  )
}

export default TodoLists
