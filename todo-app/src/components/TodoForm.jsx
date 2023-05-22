import { Row, Col, Form, Button } from "react-bootstrap"
import { TodoContext } from "../context/todoContext"
import { ADD_TODO } from "../action.types"
import { useContext, useState } from "react"
import { nanoid } from "nanoid"
import { toast } from "react-hot-toast"

const TodoForm = () => {
  const { dispatch } = useContext(TodoContext)
  const [text, setText] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()

    if (text === "") {
      return toast.error("Please add a todo")
    }
    dispatch({
      type: ADD_TODO,
      payload: {
        text,
        id: nanoid(),
      },
    })
    toast.success("Todo added successfully")

    setText("")
  }
  return (
    <Form onSubmit={handleSubmit} className='mb-3'>
      <Row>
        <Col md={10}>
          <Form.Control
            placeholder='Enter todo'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button type='submit'>Add todo</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default TodoForm
