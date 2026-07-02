import { Component } from 'react';
import type { Product } from '../types/product';

import { ClassProductCard } from './ClassProductCard';

type Props = {
  products: Product[];
  counts: Record<number, number>;
  onAdd: (id: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
};

export class ClassProductList extends Component<Props> {
  render() {
    return (
      <div className="product-list__container">
        <p className="product-list__label">Class Products</p>
        <div className="product-list">
          {this.props.products.map((product) => (
            <ClassProductCard
              key={product.id}
              product={product}
              count={this.props.counts[product.id] ?? 0}
              onAdd={this.props.onAdd}
              onIncrement={this.props.onIncrement}
              onDecrement={this.props.onDecrement}
            />
          ))}
        </div>
      </div>
    );
  }
}
