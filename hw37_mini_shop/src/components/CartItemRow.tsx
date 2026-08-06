import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/product';

type CartItemRowProps = {
  item: CartItem;
};
const CartItemRow = ({ item }: CartItemRowProps) => {
  const { removeFromCart, changeQuantity } = useCart();
  const { product, quantity } = item;
  const handleDecrease = () => changeQuantity(product.id, quantity - 1);
  const handleIncrease = () => changeQuantity(product.id, quantity + 1);
  const handleRemove = () => removeFromCart(product.id);

  return (
    <div className="flex items-center gap-3 border-b border-gray-200 py-4 dark:border-gray-800">
      <img
        src={product.image}
        alt={product.name}
        className="h-16 w-16 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ${product.price}
        </p>
        <div className="mt-2 flex items-center gap-3">
          <button
            onClick={handleDecrease}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            -
          </button>
          <span className="w-4 text-center text-sm">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            +
          </button>
        </div>
      </div>
      <button onClick={handleRemove} className="text-sm text-red-500 hover:underline">
        Remove
      </button>
    </div>
  );
};
export default CartItemRow;
