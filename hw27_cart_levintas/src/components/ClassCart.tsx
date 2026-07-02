import { Component } from 'react';
import type { Product } from '../types/product';
type CartItem = {
  product: Product;
  count: number;
};

type Props = {
  items: CartItem[];
  clearClassCart: () => void;
};

export class ClassCart extends Component<Props> {
  render() {
    const filled = this.props.items.filter((item) => item.count > 0);
    const totalCost = filled.reduce(
      (sum, item) => sum + item.product.price * item.count,
      0
    );
    return (
      <aside className="cart">
        <h2 className="cart__title">Class Cart</h2>
        {filled.length === 0 ? (
          <p className="cart__empty">Your cart is empty</p>
        ) : (
          <>
            <ul className="cart__list">
              {filled.map(({ product, count }) => (
                <li key={product.id} className="cart__item">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="cart__item-img"
                  />
                  <div className="cart__item-info">
                    <span className="cart__item-title">{product.title}</span>
                    <span className="cart__item-meta">
                      {count} × ${product.price.toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart__total">
              <span>Total</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
            <button
              className="cart__clear-btn"
              onClick={this.props.clearClassCart}
            >
              Clear cart
            </button>
          </>
        )}
      </aside>
    );
  }
}
