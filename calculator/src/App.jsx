import Button from "./components/Button"

const App = () => {
  return (
    <div className='min-h-screen dark:bg-slate-900 flex justify-center items-center py-5'>
      <main className='grid grid-rows-[minmax(7rem,_auto)_repeat(5,_5rem)] grid-cols-[repeat(4,_6rem)] gap-0 bg-slate-950'>
        <div className='col-span-full text-stone-200 bg-black rounded-lg p-1 flex flex-col justify-between items-end'>
          <div className='text-lg'>1233 +</div>
          <div className='text-4xl'>1233</div>
        </div>
        <Button span={true}>AC</Button>
        <Button>Del</Button>
        <Button>/</Button>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>*</Button>
        <Button>4</Button>
        <Button>5</Button>
        <Button>6</Button>
        <Button>+</Button>
        <Button>7</Button>
        <Button>8</Button>
        <Button>9</Button>
        <Button>-</Button>
        <Button>.</Button>
        <Button span={true}>0</Button>
        <Button>=</Button>
      </main>
    </div>
  )
}

export default App
