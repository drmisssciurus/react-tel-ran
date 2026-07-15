import { Component } from 'react';
import ColorCard from './components/ColorCard';
import { colors } from './types/colors';
import './App.css';

type AppClassState = {
  bgColor: string | null;
};

export default class AppClass extends Component<{}, AppClassState> {
  state: AppClassState = {
    bgColor: null,
  };

  changeColor = (color) => {
    this.setState({ bgColor: color });
  };

  render() {
    return (
      <div className="app">
        <h1 className="title">Color Picker</h1>
        <div
          className="main_box"
          style={{ backgroundColor: this.state.bgColor }}
        ></div>
        <div className="palette">
          {colors.map((color) => (
            <ColorCard
              key={color.id}
              color={color.color}
              changeColor={this.changeColor}
            />
          ))}
        </div>
      </div>
    );
  }
}
