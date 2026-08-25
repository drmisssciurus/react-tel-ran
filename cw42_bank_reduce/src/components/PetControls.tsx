import { useAppDispatch } from '../app/hooks';
import {
  feedAction,
  playAction,
  resetAction,
  sleepAction,
} from '../features/pet/petActions';
import type { PetMood } from '../features/pet/petMood';
import foodIcon from '../assets/food.gif';
import playIcon from '../assets/play.png';
import sleepIcon from '../assets/sleep.png';

type PetControlsProps = {
  onAction?: (mood: PetMood) => void;
};

const PetControls = ({ onAction }: PetControlsProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="pet-controls-buttons">
      <button
        type="button"
        className="pet-btn feed"
        onClick={() => dispatch(feedAction())}
        onPointerDown={() => onAction?.('feed')}
        onPointerUp={() => onAction?.('idle')}
      >
        <img src={foodIcon} alt="" />
        Feed
      </button>
      <button
        type="button"
        className="pet-btn play"
        onClick={() => dispatch(playAction())}
        onPointerDown={() => onAction?.('play')}
        onPointerUp={() => onAction?.('idle')}
      >
        <img src={playIcon} alt="" />
        Play
      </button>
      <button
        type="button"
        className="pet-btn sleep"
        onClick={() => {
          dispatch(sleepAction());
          onAction?.('sleep');
        }}
      >
        <img src={sleepIcon} alt="" />
        Sleep
      </button>
      <button
        type="button"
        className="pet-btn reset"
        onClick={() => {
          dispatch(resetAction());
          onAction?.('idle');
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default PetControls;
