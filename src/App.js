import { useState } from 'react';

// const History = props => {
//   if (props.allClicks.length === 0) {
//     return (
//       <>
//       the app is used by pressing the buttons
//       </>
//     )
//   }
//   return (
//     <>
//     button press history: {props.allClicks.join(' ')}
//     </>
//   )
// }

// const Button = ({handleClick, text}) => (
//   <button onClick={handleClick}>{text}</button>
// )


const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  // const [left, setLeft] = useState(0);
  // const [right, setRight] = useState(0);
  // const [allClicks, setAll] = useState([]);
  // const [total, setTotal] = useState(0);
  // // const [clicks, setClicks] = useState({left:0, right:0})

  // const handleLeftClick = () => {
  //   setAll(allClicks.concat('L')) 
  //   const updatedLeft = left + 1
  //   setLeft(updatedLeft)
  //   setTotal(updatedLeft + right)
  //   // setClicks({ ...clicks, left: clicks.left + 1})
  // }
  
  // const handleRightClick = () => {
  //   setAll(allClicks.concat('R'))
  //   const updatedRight = right + 1
  //   setRight(updatedRight)
  //   setTotal( updatedRight + left)
  //   // setClicks({  ...clicks, right: clicks.right + 1})
  // }

  return (
    <>
      {value}
      <button onClick={() => setToValue(1000)}>thousand</button>
      <button onClick={() => setToValue(0)}>reset</button>
      <button onClick={() => setToValue(value + 1)}>increment</button>

    {/* {left}
    <Button handleClick={handleLeftClick} text="left"/>
    <Button handleClick={handleRightClick} text="right"/>
    {right}
    <p>total {total}</p>
    <History allClicks={allClicks}/> */}
   
    </>
  );
}

export default App;
