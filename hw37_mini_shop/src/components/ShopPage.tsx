import { products } from '../data/products';
import ProductCard from './ProductCard';

const ShopPage = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <h2 className="mb-6 text-2xl font-bold">Shop</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ShopPage;
