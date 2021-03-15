import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
  {props.text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  if (good>0 || neutral>0 || bad>0) {
    return(
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={good+neutral+bad} />
          <StatisticsLine text="average" value={((good-bad)/(good+neutral+bad)).toFixed(2)}  />
          <StatisticsLine text="positive" value={(good/(good+neutral+bad)*100).toFixed(1) + " %"} />
        </tbody>
      </table>
    )
  } else {
    return (
      <p> No feedback given yet </p>
    )
  }
}

const StatisticsLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2> Give feedback </h2>
      <Button handleClick={() => setGood(good+1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="Neutral" />
      <Button handleClick={() => setBad(bad+1)} text="Bad" />
      <h2> Statistics </h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
