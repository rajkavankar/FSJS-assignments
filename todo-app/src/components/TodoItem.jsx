import { ListGroup, Button } from "react-bootstrap"
import { FaTrash } from "react-icons/fa"
import { REMOVE_TODO } from "../action.types"
import { TodoContext } from "../context/todoContext"
import { useContext } from "react"

const TodoItem = ({ todo }) => {
  const { dispatch } = useContext(TodoContext)
  return (
    <ListGroup.Item>
      <div className='d-flex justify-content-between align-items-center'>
        <p>{todo.text}</p>
        <Button
          size='sm'
          variant='danger'
          onClick={() => {
            if (window.confirm("are you sure")) {
              dispatch({ type: REMOVE_TODO, payload: todo.id })
            }
          }}>
          <FaTrash />
        </Button>
      </div>
    </ListGroup.Item>
  )
}

export default TodoItem
