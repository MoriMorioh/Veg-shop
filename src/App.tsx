import { useEffect, useState } from 'react';
import { MantineProvider, Container } from '@mantine/core';
import { Header } from './components/Header/Header';
import { ProductGrid } from './components/ProductGrid/ProductGrid';
import type { Product, CartItem } from './types/product';
import { fetchProducts } from './api/products';
import classes from './App.module.css';
import '@mantine/core/styles.css';

export function VegetableShop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<Record<number, CartItem>>({});
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        const initialQty = data.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {});
        setQuantities(initialQty);
      })
      .catch((error) => console.error('Failed to fetch products:', error))
      .finally(() => setLoading(false));
  }, []);

  const handleQtyChange = (id: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddToCart = (product: Product) => {
    const qty = quantities[product.id] || 1;
    setCart((prev) => ({
      ...prev,
      [product.id]: {
        product,
        quantity: (prev[product.id]?.quantity || 0) + qty,
      },
    }));
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const cartList = Object.values(cart);
  const totalItems = cartList.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartList.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className={classes.wrapper}>
      <Header
        cartItems={cartList}
        totalItems={totalItems}
        totalPrice={totalPrice}
        onRemoveItem={handleRemoveFromCart}
      />

      <Container size="lg" py="xl">
        <ProductGrid
          products={products}
          loading={loading}
          quantities={quantities}
          onQtyChange={handleQtyChange}
          onAddToCart={handleAddToCart}
        />
      </Container>
    </div>
  );
}

export default function App() {
  return (
    <MantineProvider>
      <VegetableShop />
    </MantineProvider>
  );
}
