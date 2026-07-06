import type { Product } from '../types/product';

type Props = {
  product: Product;
  count: number;
  onAdd: (id: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
};

function ProductCard({ product, count, onAdd, onIncrement, onDecrement }: Props) {
  const { id, title, price, image } = product;

  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-card__img" />
      <h3 className="product-card__title">{title}</h3>
      <p className="product-card__price">${price.toFixed(2)}</p>
      {count === 0 ? (
        <button className="product-card__add-btn" onClick={() => onAdd(id)}>
          Add to cart
        </button>
      ) : (
        <div className="product-card__counter">
          <button className="product-card__counter-btn" onClick={() => onDecrement(id)}>
            -
          </button>
          <span className="product-card__count">{count}</span>
          <button className="product-card__counter-btn" onClick={() => onIncrement(id)}>
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
