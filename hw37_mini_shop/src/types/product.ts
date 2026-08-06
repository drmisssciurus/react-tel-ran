export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartContextValue = {
  cart: CartItem[];
  totalPrice: number;
  totalCount: number;
  isCartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  changeQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};
