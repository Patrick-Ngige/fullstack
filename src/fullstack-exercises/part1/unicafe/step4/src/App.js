import { useState } from 'react'

const Statistics = ({good, neutral, bad, total, average, positive}) => {
  
  if (total > 0) {
    return (
    <>
      <h1>Statistics</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p >total: {total}</p>
      <p >avereage: {average}</p>
      <p >positive: {positive} %</p>
      </>
    )
  }
  return (
    <div>No feedback given</div>
  )
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updateGood = good + 1
    const updatedTotal = updateGood + neutral + bad
    const updatedAverage = updatedTotal / 3
    const updatedPositive = (updateGood / updatedTotal) * 100
    setGood(updateGood)
    setTotal(updatedTotal)
    setAverage(updatedAverage)
    setPositive(updatedPositive)
  } 

  const handleNeutralClick = () => {
    const updateNeutral = neutral + 1
    const updatedTotal = good + updateNeutral + bad
    const updatedAverage = updatedTotal / 3
    const updatedPositive = (good / updatedTotal) * 100
    setNeutral(updateNeutral)
    setTotal(updatedTotal)
    setAverage(updatedAverage)
    setPositive(updatedPositive)
    
  } 

  const handleBadClick = () => {
    const updateBad = bad + 1
    const updatedTotal = good + neutral + updateBad
    const updatedAverage = updatedTotal / 3
    const updatedPositive = (good / updatedTotal) * 100
    setBad(updateBad)
    setTotal(updatedTotal) 
    setAverage(updatedAverage)
    setPositive(updatedPositive)
 
  } 

  
  return (
    <>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Statistics 
      good={good}
      neutral={neutral}
      bad={bad}
      total={total}
      average={average}
      positive={positive}
      />
    </>
  )
}

export default App