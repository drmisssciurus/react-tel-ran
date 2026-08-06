import { useCart } from '../context/CartContext';
import CartItemRow from './CartItemRow';
import CheckoutBox from './CheckoutBox';

const CartPanel = () => {
  const { cart, isCartOpen, closeCart } = useCart();

  return (
    <>
      {isCartOpen && (
        <div onClick={closeCart} className="fixed inset-0 z-40 bg-black/50" />
      )}
      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-xl transition-transform duration-300 dark:bg-gray-900 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
          <h3 className="text-lg font-bold">Cart</h3>
          <button
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          {cart.length === 0 ? (
            <p className="mt-8 text-center text-gray-500 dark:text-gray-400">
              Your cart is empty
            </p>
          ) : (
            cart.map((item) => (
              <CartItemRow key={item.product.id} item={item} />
            ))
          )}
        </div>

        <CheckoutBox />
      </div>
    </>
  );
};

export default CartPanel;
