import { Component } from 'react';
import type { Product } from '../types/product';

type Props = {
  product: Product;
  count: number;
  onAdd: (id: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
};

export class ClassProductCard extends Component<Props> {
  render() {
    return (
      <div className="product-card">
        <img
          src={this.props.product.image}
          alt={this.props.product.title}
          className="product-card__img"
        />
        <h3 className="product-card__title">{this.props.product.title}</h3>
        <p className="product-card__price">
          ${this.props.product.price.toFixed(2)}
        </p>
        {this.props.count === 0 ? (
          <button
            className="product-card__add-btn"
            onClick={() => this.props.onAdd(this.props.product.id)}
          >
            Add to cart
          </button>
        ) : (
          <div className="product-card__counter">
            <button
              className="product-card__counter-btn"
              onClick={() => this.props.onDecrement(this.props.product.id)}
            >
              -
            </button>
            <span className="product-card__count">{this.props.count}</span>
            <button
              className="product-card__counter-btn"
              onClick={() => this.props.onIncrement(this.props.product.id)}
            >
              +
            </button>
          </div>
        )}
      </div>
    );
  }
}
