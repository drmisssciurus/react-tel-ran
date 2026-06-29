import React, { Component } from 'react';
import type { Car } from '../types/car';

export class CarClass extends Component<Car> {
  render() {
    return (
      <div className="car-card">
        <div className="car-card__header">
          <div className="car-card__icon">🚗</div>
          <div>
            <div className="car-card__model">{this.props.model}</div>
            <div className="car-card__manufacturer">
              {this.props.manufacturer}
            </div>
          </div>
        </div>

        <div className="car-card__divider" />

        <div className="car-card__info">
          <div className="car-card__row">
            <span className="car-card__label">Year</span>
            <span className="car-card__value">{this.props.year}</span>
          </div>
          <div className="car-card__row">
            <span className="car-card__label">Serial №</span>
            <span className="car-card__badge">{this.props.serialNumber}</span>
          </div>
        </div>
      </div>
    );
  }
}
