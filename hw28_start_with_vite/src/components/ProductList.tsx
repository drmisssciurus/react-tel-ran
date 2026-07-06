import type { Product } from '../types/product';
import ProductCard from './ProductCard';

type Props = {
  products: Product[];
  counts: Record<number, number>;
  onAdd: (id: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
};

function ProductList({
  products,
  counts,
  onAdd,
  onIncrement,
  onDecrement,
}: Props) {
  return (
    <div className="product-list__container">
      <p className="product-list__label">Functional Products</p>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            count={counts[product.id] ?? 0}
            onAdd={onAdd}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
