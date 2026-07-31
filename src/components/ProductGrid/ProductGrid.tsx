import { SimpleGrid, Loader, Title, Box } from '@mantine/core';
import { ProductCard } from '../ProductCard/ProductCard';
import type { Product } from '../../types/product';
import classes from './ProductGrid.module.css';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  quantities: Record<number, number>;
  onQtyChange: (id: number, delta: number) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductGrid = ({
  products,
  loading,
  quantities,
  onQtyChange,
  onAddToCart,
}: ProductGridProps) => {
  if (loading) {
    return (
      <Box className={classes.loaderContainer}>
        <Loader color="#54b46a" size="xl" data-testid="loader" />
      </Box>
    );
  }

  return (
    <>
      <Title order={2} fw={600}>
        Catalog
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={quantities[product.id] || 1}
            onQtyChange={onQtyChange}
            onAddToCart={onAddToCart}
          />
        ))}
      </SimpleGrid>
    </>
  );
};
