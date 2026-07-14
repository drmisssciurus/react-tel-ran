import { useRef, useState } from 'react';
import './App.css';
const colors = ['red', 'blue', 'green'];
function App() {
  const [bgColor, setBgColor] = useState('');

  // const boxRef = useRef(null);

  const changeColor = (color) => {
    setBgColor(color);
  };
  // const changeColorRed = () => {
  //   // const nextColor = 'red';
  //   setBgColor('red');
  // };
  // const changeColorBlue = () => {
  //   // const nextColor = 'blue';
  //   setBgColor('blue');
  // };
  // const changeColorGreen = () => {
  //   // const nextColor = 'green';
  //   setBgColor('green');
  // };

  // const changeColor = (currentColor) => {
  //   // const nextColor = 'red';
  //   setBgColor(currentColor);
  // };
  return (
    <div className="app">
      <h1 className="title">Color Picker</h1>
      <div className="main_box" style={{ backgroundColor: bgColor }}></div>
      {/* <div className="main_box" ref={boxRef}></div> */}
      <div className="palette">
        {/* <button
          className="mini_box red_box"
          onClick={() => changeColor('red')}
        ></button>
        <button
          className="mini_box blue_box"
          onClick={() => changeColor('blue')}
        ></button>
        <button
          className="mini_box green_box"
          onClick={() => changeColor('green')}
        ></button> */}
        {colors.map((color) => (
          <button
            key={color}
            className={`mini_box ${color}_box`}
            onClick={() => changeColor(color)}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default App;
