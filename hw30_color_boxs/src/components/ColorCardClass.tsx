import type { Colors } from '../types/colors';
import { Component } from 'react';

type ColorCardProps = {
  color: string;
  changeColor: (color: string) => void;
};
export default class ColorCardClass extends Component<ColorCardProps> {
  render() {
    return (
      <button
        className={`mini_box ${this.props.color}_box`}
        onClick={() => this.props.changeColor(this.props.color)}
        title="Click to change color"
      ></button>
    );
  }
}
