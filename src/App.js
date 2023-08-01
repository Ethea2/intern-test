import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [show, setShow] = useState(true)
  const [start, setStart] = useState(false)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [todos, setTodos] = useState([])
  const [todoInput, setTodoInput] = useState('')
  const [data, setData] = useState()
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const intervals = useRef()

  const toggle = () => {
    if (show === false) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  useEffect(() => {
    if (seconds === 60) {
      setSeconds((oldSeconds) => oldSeconds - 60)
      setMinutes((oldMinutes) => oldMinutes + 1)
    }
    if (minutes === 60) {
      setMinutes(1)
    }
  })

  const startTimer = () => {
    setStart(start)
    intervals.current = setInterval(() => {
      setSeconds((oldSeconds) => oldSeconds + 1)
      return () => clearInterval(intervals.current)
    }, 1000)
  }

  const pauseTimer = () => {
    clearInterval(intervals.current)
  }

  const reset = () => {
    setMinutes(30)
    setSeconds(0)
    clearInterval(intervals.current)
  }

  const addTodo = (todo) => {
    setTodos([...todos, todo])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setData({
      username: username,
      name: name,
      age: age
    })
    setSubmitted(true)
  }


  return (
    <div className="App flex-col items-center justify-center">
      {show &&
        <div className='text-emerald-300 text-8xl m-16'>
          Make this vanish
        </div>}
      <button onClick={toggle} className={`bg-emerald-300 w-32 h-12 ${show ? '' : 'mt-16'} transition hover:-translate-y-1 hover:bg-emerald-200 cursor-pointer`}>Click me!</button>
      <div className='text-emerald-300 text-8xl m-16'>
        Timer: {minutes} minutes {seconds.toString().padStart(2, 0)} seconds
      </div>
      <div className='flex gap-6 items-center justify-center'>
        <button onClick={startTimer} className='bg-emerald-300 w-32 h-12 transition hover:-translate-y-1 hover:bg-emerald-200 cursor-pointer'>Start</button>
        <button onClick={pauseTimer} className='bg-emerald-300 w-32 h-12 transition hover:-translate-y-1 hover:bg-emerald-200 cursor-pointer'>Pause</button>
        <button onClick={reset} className='bg-emerald-300 w-32 h-12 transition hover:-translate-y-1 hover:bg-emerald-200 cursor-pointer'>Reset</button>
      </div>

      <div className='flex-col m-16'>
        <div>
          <input onChange={(e) => setTodoInput(e.target.value)} className='bg-gray-900 border-2 rounded-lg border-emerald-300 text-emerald-300' />
          <button onClick={() => addTodo(todoInput)} className='bg-emerald-300 transition hover:-translate-y-1 hover:bg-emerald-200 cursor-pointer'>Add Task</button>
        </div>
        {todos.map((todo) => {
          return (
            <div className='text-emerald-300 m-2 text-lg'>
              {todo}
            </div>
          )
        })}
      </div>
      <div className='text-emerald-300 text-8xl m-16'>
        Form:
        <form onSubmit={handleSubmit}>
          <div className='flex-col text-xl m-16 items-center justify-center'>
            <div>
              Username:<input onChange={(e) => setUsername(e.target.value)} className='m-3 bg-gray-900 border-2 rounded-lg border-emerald-300 text-emerald-300' />
            </div>
            <div>
              Full Name:<input onChange={(e) => setName(e.target.value)} className='m-3 bg-gray-900 border-2 rounded-lg border-emerald-300 text-emerald-300' />
            </div>
            <div>
              Age:<input type='number' onChange={(e) => setAge(e.target.value)} className='m-3 bg-gray-900 border-2 rounded-lg border-emerald-300 text-emerald-300' />
            </div>
            <button type='submit' className='m-3 text-black bg-emerald-300 w-32 h-12 transition hover:-translate-y-1 hover:bg-emerald-200 cursor-pointer'>Submit</button>
          </div>
        </form>
      </div>
      {
        submitted && 
        <div className='text-emerald-300 text-8xl m-16 flex-col'>
          Request sent to database:
          <ul>
            <li>Username: {data.username}</li>
            <li>Name: {data.name}</li>
            <li>Age: {data.age}</li>
          </ul>
        </div>
      }
    </div>
  );
}

export default App;
