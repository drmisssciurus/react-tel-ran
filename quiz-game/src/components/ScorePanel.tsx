import type { GameScore } from '../types';
import { getAccuracy } from '../utils/game';

type ScorePanelProps = {
  user: string;

  score: GameScore;
  onReset: () => void;
};

const ScorePanel = ({ user, score, onReset }: ScorePanelProps) => {
  return (
    <div className="score-panel">
      <div className="score-stat">
        <strong>{user}</strong>
        your score is
      </div>
      <div className="score-stat">
        <strong>{score.correct}</strong>
        correct
      </div>
      <div className="score-stat">
        <strong>{score.wrong}</strong>
        wrong
      </div>
      <div className="score-stat">
        <strong>{score.total}</strong>
        total
      </div>
      <div className="score-stat accuracy">
        <strong>{getAccuracy(score)}%</strong>
        accuracy
      </div>
      <button className="reset-btn" type="button" onClick={onReset}>
        reset
      </button>
    </div>
  );
};

export default ScorePanel;
