import { useState } from "react";

const StatisticLine = (props) => {
  return (
    <tr>
      <td> {props.text} </td>
      <td> {props.value} </td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.total > 0) {
    return ( 
      <>
        <h1>Statistics</h1>
        <table>
          <tbody>
              <StatisticLine text="good" value={props.good} />
              <StatisticLine text="neutral" value={props.neutral} />
              <StatisticLine text="bad" value={props.bad} />
              <StatisticLine text="total" value={props.total} />
              <StatisticLine text="average" value={props.average} />
              <StatisticLine text="positive" value={`${props.positive}%`} />
          </tbody>
        </table>
      </>
    );
  }
  return <div>No feedback given</div>;
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodClick = () => {
    const updateGood = good + 1;
    const updatedTotal = updateGood + neutral + bad;
    const updatedAverage = updatedTotal / 3;
    const updatedPositive = (updateGood / updatedTotal) * 100;
    setGood(updateGood);
    setTotal(updatedTotal);
    setAverage(updatedAverage);
    setPositive(updatedPositive);
  };

  const handleNeutralClick = () => {
    const updateNeutral = neutral + 1;
    const updatedTotal = good + updateNeutral + bad;
    const updatedAverage = updatedTotal / 3;
    const updatedPositive = (good / updatedTotal) * 100;
    setNeutral(updateNeutral);
    setTotal(updatedTotal);
    setAverage(updatedAverage);
    setPositive(updatedPositive);
  };

  const handleBadClick = () => {
    const updateBad = bad + 1;
    const updatedTotal = good + neutral + updateBad;
    const updatedAverage = updatedTotal / 3;
    const updatedPositive = (good / updatedTotal) * 100;
    setBad(updateBad);
    setTotal(updatedTotal);
    setAverage(updatedAverage);
    setPositive(updatedPositive);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </>
  );
};

export default App;
