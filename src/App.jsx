import { useState } from 'react'
import { Button } from './components/ui/button'
import './App.css'
import Hero from './components/components/Hero.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Hero />
    </>
  )
}

export default App
