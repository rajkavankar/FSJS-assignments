import { Container } from "react-bootstrap"
import TodoForm from "./components/TodoForm"
import TodoLists from "./components/TodoLists"

const App = () => {
  return (
    <div style={{ height: "100vh" }} className='bg-light pt-5'>
      <Container className='pt-5'>
        <TodoForm />
        <TodoLists />
      </Container>
    </div>
  )
}

export default App
