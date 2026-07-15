type ColorCardProps = {
  color: string;
  changeColor: (color: string) => void;
};
const ColorCard = ({ color, changeColor }: ColorCardProps) => {
  return (
    <button
      className={`mini_box ${color}_box`}
      onClick={() => changeColor(color)}
      title="Click to change color"
    ></button>
  );
};

export default ColorCard;
