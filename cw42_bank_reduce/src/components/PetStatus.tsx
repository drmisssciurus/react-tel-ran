import { useAppSelector } from '../app/hooks';

const PetStatus = () => {
  const name = useAppSelector((state) => state.pet.name);
  const hunger = useAppSelector((state) => state.pet.hunger);
  const happiness = useAppSelector((state) => state.pet.happiness);
  const energy = useAppSelector((state) => state.pet.energy);

  return (
    <div className="pet-status">
      <p className="pet-name">🐾 Cat {name}</p>
      <div className="pet-stats">
        <div className="pet-stat-row">
          <span className="pet-stat-label">Hunger</span>
          <div className="pet-stat-bar">
            <div
              className="pet-stat-fill fill-hunger"
              style={{ width: `${hunger}%` }}
            />
          </div>
          <span className="pet-stat-value">{hunger}</span>
        </div>
        <div className="pet-stat-row">
          <span className="pet-stat-label">Happiness</span>
          <div className="pet-stat-bar">
            <div
              className="pet-stat-fill fill-happiness"
              style={{ width: `${happiness}%` }}
            />
          </div>
          <span className="pet-stat-value">{happiness}</span>
        </div>
        <div className="pet-stat-row">
          <span className="pet-stat-label">Energy</span>
          <div className="pet-stat-bar">
            <div
              className="pet-stat-fill fill-energy"
              style={{ width: `${energy}%` }}
            />
          </div>
          <span className="pet-stat-value">{energy}</span>
        </div>
      </div>
    </div>
  );
};

export default PetStatus;
