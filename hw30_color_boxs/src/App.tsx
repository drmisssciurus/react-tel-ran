import { useState } from 'react';
import './App.css';
import ColorCard from './components/ColorCard';
import { colors } from './types/colors';

function App() {
  const [bgColor, setBgColor] = useState(null);

  const changeColor = (color) => {
    setBgColor(color);
  };

  return (
    <div className="app">
      <h1 className="title">Color Picker</h1>
      <div className="main_box" style={{ backgroundColor: bgColor }}></div>
      <div className="palette">
        {colors.map((color) => (
          <ColorCard
            key={color.id}
            color={color.color}
            changeColor={changeColor}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
