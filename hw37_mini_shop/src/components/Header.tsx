import { useCart } from '../context/CartContext';

const Header = () => {
  const { totalCount, toggleCart } = useCart();
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h1 className="text-xl font-bold tracking-tight">My Shop</h1>
      <button
        onClick={toggleCart}
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-xl transition hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Open cart"
      >
        🛒
        {totalCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-xs font-semibold text-white">
            {totalCount}
          </span>
        )}
      </button>
    </header>
  );
};

export default Header;
