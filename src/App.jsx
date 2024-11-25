import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const colorArr = ['black', 'white'];

function App() {
  const [color, setColor] = useState(0);
  useEffect(() => {
    const inter = setTimeout(() => {
      setColor((color + 1) % colorArr.length);
    }, 50);

    return () => clearTimeout(inter);
  })

  return (
    <>
      <div style={
        {
          width: "80vw",
          height: "80vh",
          backgroundColor: colorArr[color],
        }
      }>
        <button onClick={() => {setColor((color + 1) % colorArr.length)}}>
          MMB
        </button>
      </div>
    </>
  )
}

export default App
