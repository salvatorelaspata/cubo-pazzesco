
import { useEffect } from 'react'
import './App.css'
import { Scene } from './Scene'

function App() {
  useEffect(() => {
    console.log('App - useEffect')
  }, [])
  return (
    <>
      <Scene />
    </>
  )
}

export default App
