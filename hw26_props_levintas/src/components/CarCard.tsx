import { type Car } from '../types/car';
import '../styles/CarCard.css';

const CarCard = ({ model, serialNumber, manufacturer, year }: Car) => {
  return (
    <div className="car-card">
      <div className="car-card__header">
        <div className="car-card__icon">🚗</div>
        <div>
          <div className="car-card__model">{model}</div>
          <div className="car-card__manufacturer">{manufacturer}</div>
        </div>
      </div>

      <div className="car-card__divider" />

      <div className="car-card__info">
        <div className="car-card__row">
          <span className="car-card__label">Year</span>
          <span className="car-card__value">{year}</span>
        </div>
        <div className="car-card__row">
          <span className="car-card__label">Serial №</span>
          <span className="car-card__badge">{serialNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
