import type { User } from '../types';
import { getAccuracy } from '../utils/game';
import { loadScore } from '../storage/scoreStorage';

type RatingPanelProps = {
  users: User[];
};

const RatingPanel = ({ users }: RatingPanelProps) => {
  const ranked = [...users]
    .map((user) => ({ user, score: loadScore(user.id) }))
    .sort((a, b) => getAccuracy(b.score) - getAccuracy(a.score));

  return (
    <div className="rating-panel">
      <h2 className="rating-title">Leaderboard</h2>
      {ranked.map(({ user, score }, index) => (
        <div key={user.id} className="rating-row">
          <span className="rating-rank">#{index + 1}</span>
          <span className="rating-name">{user.name}</span>
          <span className="rating-stat"><strong>{score.correct}</strong> correct</span>
          <span className="rating-stat"><strong>{score.wrong}</strong> wrong</span>
          <span className="rating-accuracy">{getAccuracy(score)}%</span>
        </div>
      ))}
      {users.length === 0 && (
        <p className="rating-empty">No players yet</p>
      )}
    </div>
  );
};

export default RatingPanel;
