import Header from './components/Header';
import ShopPage from './components/ShopPage';
import CartPanel from './components/CartPanel';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <ShopPage />
      <CartPanel />
    </div>
  );
}

export default App;
