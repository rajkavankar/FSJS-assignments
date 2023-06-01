import Digitbutton from "./components/Digitbutton"
import Operationbutton from "./components/Operationbutton"
import Button from "./components/Button"
import { useReducer, FC } from "react"
import reducer, {
  StateInterface,
  ActionInterface,
  Actions,
  formatter,
} from "./reducer"

const App: FC = () => {
  const [{ previousOprand, operation, currentOprand }, dispatch] = useReducer<
    (state: StateInterface, action: ActionInterface) => any
  >(reducer, {})
  return (
    <div className='min-h-screen dark:bg-slate-900 flex justify-center items-center py-5'>
      <main className='grid grid-rows-[minmax(7rem,_auto)_repeat(5,_5rem)] grid-cols-[repeat(4,_6rem)] gap-0 bg-slate-950'>
        <div className='col-span-full text-stone-200 bg-black rounded-lg p-1 flex flex-col justify-between items-end'>
          <div className='text-lg'>
            {formatter(previousOprand)} {operation}
          </div>
          <div className='text-4xl'>{formatter(currentOprand)}</div>
        </div>
        <Button span={true} onClick={() => dispatch({ type: Actions.CLEAR })}>
          AC
        </Button>
        <Button onClick={() => dispatch({ type: Actions.DELETE_DIGIT })}>
          Del
        </Button>

        <Operationbutton operation='/' dispatch={dispatch} />

        <Digitbutton digit='1' dispatch={dispatch} />
        <Digitbutton digit='2' dispatch={dispatch} />
        <Digitbutton digit='3' dispatch={dispatch} />
        <Operationbutton operation='*' dispatch={dispatch} />

        <Digitbutton digit='4' dispatch={dispatch} />
        <Digitbutton digit='5' dispatch={dispatch} />
        <Digitbutton digit='6' dispatch={dispatch} />
        <Operationbutton operation='+' dispatch={dispatch} />

        <Digitbutton digit='7' dispatch={dispatch} />
        <Digitbutton digit='8' dispatch={dispatch} />
        <Digitbutton digit='9' dispatch={dispatch} />

        <Operationbutton operation='-' dispatch={dispatch} />

        <Digitbutton digit='.' dispatch={dispatch} />
        <Digitbutton span={true} digit='0' dispatch={dispatch} />

        <Button onClick={() => dispatch({ type: Actions.EVALUATE })}>=</Button>
      </main>
    </div>
  )
}

export default App
