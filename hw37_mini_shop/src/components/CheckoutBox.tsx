import { useCart } from '../context/CartContext';

const CheckoutBox = () => {
  const { totalPrice, cart, clearCart, closeCart } = useCart();

  const handleCheckout = () => {
    clearCart();
    closeCart();
  };

  return (
    <div className="border-t border-gray-200 p-4 dark:border-gray-800">
      <div className="mb-3 flex items-center justify-between text-lg font-bold">
        <span>Total</span>
        <span>${totalPrice}</span>
      </div>
      <button
        onClick={handleCheckout}
        disabled={cart.length === 0}
        className="w-full rounded-lg bg-violet-600 py-2 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-gray-300 dark:disabled:bg-gray-700"
      >
        Checkout
      </button>
    </div>
  );
};

export default CheckoutBox;
