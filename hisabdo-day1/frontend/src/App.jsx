import { useState } from 'react'
import './App.css'

function App() {
  const [clicked, setClicked] = useState(false)

  return (
    <div className="app">
      <h1>Welcome to HisabDo MERN Internship 🚀</h1>
      <p>
        This is my Day 1 practice project. It's a simple React page with a
        heading, some text, and a button — built while learning the basics
        of the MERN stack.
      </p>
      <button onClick={() => setClicked(!clicked)}>
        {clicked ? "You clicked me! 🎉" : "Click Me"}
      </button>
    </div>
  )
}

export default App
