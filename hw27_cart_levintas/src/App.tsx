import { useState } from 'react';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import { products } from './mock/products';
import { ClassCart } from './components/ClassCart';
import { ClassProductCard } from './components/ClassProductCard';
import { ClassProductList } from './components/ClassProductList';

const App = () => {
  const [functionCounts, setFunctionCounts] = useState<Record<number, number>>(
    {}
  );
  const [classCounts, setClassCounts] = useState<Record<number, number>>({});
  //count store for cart
  const cartItems = products.map((product) => {
    const productCount = functionCounts[product.id];
    const count = productCount ?? 0;

    const cartItem = {
      product: product,
      count: count,
    };

    return cartItem;
  });
  console.log('cartItems', cartItems);

  const cartClassItems = products.map((product) => {
    const productCount = classCounts[product.id];
    const count = productCount ?? 0;

    const cartItem = {
      product: product,
      count: count,
    };

    return cartItem;
  });
  console.log('cartClassItems', cartClassItems);

  function handleAdd(id: number) {
    setFunctionCounts((currentCounts) => {
      const copy = { ...currentCounts };
      copy[id] = 1;
      console.log('copy', copy);

      return copy;
    });
  }

  function handleClassAdd(id: number) {
    setClassCounts((currentCounts) => {
      const copy = { ...currentCounts };
      copy[id] = 1;
      console.log('copy', copy);

      return copy;
    });
  }

  function handleIncrement(id: number) {
    setFunctionCounts((currentCounts) => {
      const copy = { ...currentCounts };
      console.log(copy);
      copy[id] = (currentCounts[id] ?? 0) + 1;
      return copy;
    });
  }

  function handleClassIncrement(id: number) {
    setClassCounts((currentCounts) => {
      const copy = { ...currentCounts };
      console.log(copy);
      copy[id] = (currentCounts[id] ?? 0) + 1;
      return copy;
    });
  }

  function handleDecrement(id: number) {
    setFunctionCounts((currentCounts) => {
      const copy = { ...currentCounts };
      copy[id] = Math.max(0, (currentCounts[id] ?? 0) - 1);
      return copy;
    });
  }

  function handleClassDecrement(id: number) {
    setClassCounts((currentCounts) => {
      const copy = { ...currentCounts };
      copy[id] = Math.max(0, (currentCounts[id] ?? 0) - 1);
      return copy;
    });
  }

  function handleClearCart() {
    setFunctionCounts({});
  }

  function handleClearClassCart() {
    setClassCounts({});
  }

  return (
    <div className="app">
      <header className="app-header">Happy Shopping</header>
      <div className="app-body">
        <Cart items={cartItems} clearCart={handleClearCart} />
        <ProductList
          products={products}
          counts={functionCounts}
          onAdd={handleAdd}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
        <ClassCart
          items={cartClassItems}
          clearClassCart={handleClearClassCart}
        />
        <ClassProductList
          products={products}
          counts={classCounts}
          onAdd={handleClassAdd}
          onIncrement={handleClassIncrement}
          onDecrement={handleClassDecrement}
        />
      </div>
    </div>
  );
};

export default App;
