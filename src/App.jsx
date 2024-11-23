import { useState } from 'react'
import { Button } from './components/ui/button'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>Welcome To Trip Planner</h2>
      <Button>Subscribe</Button>
    </>
  )
}

export default App
