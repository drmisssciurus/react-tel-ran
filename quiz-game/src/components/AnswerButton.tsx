import type { City } from '../types';

type AnswerButtonProps = {
  city: City;
  correctCityId: string;
  selectedCityId?: string;
  onSelect: (city: City) => void;
};

const AnswerButton = ({
  city,
  correctCityId,
  selectedCityId,
  onSelect,
}: AnswerButtonProps) => {
  const isAnswered = Boolean(selectedCityId);
  const isCorrect = city.id === correctCityId;
  const isSelected = city.id === selectedCityId;

  let className = 'answer-button';
  if (isAnswered && isCorrect) {
    className += ' correct';
  } else if (isAnswered && isSelected) {
    className += ' wrong';
  }
  return (
    <button
      className={className}
      type="button"
      onClick={() => onSelect(city)}
      disabled={isAnswered}
    >
      <span>{city.name}</span>
      <span>{city.country}</span>
    </button>
  );
};

export default AnswerButton;
