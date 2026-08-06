import { useCart } from '../context/CartContext';
import type { Product } from '../types/product';

type ProductCardProps = {
  product: Product;
};
const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { name, price, image } = product;

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <img src={image} alt={name} className="h-40 w-40 rounded-lg object-cover" />
      <h3 className="text-center text-lg font-semibold">{name}</h3>
      <p className="text-lg font-bold text-violet-600 dark:text-violet-400">
        ${price}
      </p>
      <button
        onClick={() => addToCart(product)}
        className="w-full rounded-lg bg-violet-600 py-2 font-medium text-white transition hover:bg-violet-700"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
