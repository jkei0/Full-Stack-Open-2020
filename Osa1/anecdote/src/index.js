import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
  {props.text}
  </button>
)

const getRandomNum = () => Math.floor(Math.random()*6)
const updatePoints = (points, state) => {
  const copy = { ...points }
  copy[state] += 1
  if(copy[state] > copy[copy[6]])
    copy[6] = state
  return copy
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(7)).map(Number.prototype.valueOf,0))

  return (
    <div>
      <h2> Anecdote of the day </h2>
      {props.anecdotes[selected]}
      <p>
        <Button handleClick={() => setSelected(getRandomNum())} text="next anecdote" />
        <Button handleClick={() => setPoints(updatePoints(points, selected))} text="vote anecdote" />
      </p>
      <h2> Anecdote with most votes </h2>
      {props.anecdotes[points[6]]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
