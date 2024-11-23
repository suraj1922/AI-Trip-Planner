import { useState } from 'react'
import { Button } from './components/ui/button'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button>Subscribe</Button>
    </>
  )
}

export default App
