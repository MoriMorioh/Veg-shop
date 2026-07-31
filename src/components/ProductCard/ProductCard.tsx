import { Card, Image, Text, Group, Button, Badge } from '@mantine/core';
import { IconPlus, IconMinus, IconShoppingCart } from '@tabler/icons-react';
import type { Product } from '../../types/product';
import classes from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQtyChange: (id: number, delta: number) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, quantity, onQtyChange, onAddToCart }: ProductCardProps) => {
  const [name, weight] = product.name.split('-');

  return (
    <Card shadow="none" padding="lg" withBorder={false} radius="xl" className={classes.card}>
      <Card.Section p="md">
        <Image src={product.image} height={180} fit="contain" alt={product.name} />
      </Card.Section>

      <Group justify="space-between" align="center" mt="sm" mb="md">
        <Group gap="6" align="baseline">
          <Text fw="700" size="md" c="dark">
            {name}
          </Text>
          <Text size="xs" c="dimmed" fw={500}>
            {weight}
          </Text>
        </Group>

        <Group gap="6" align="center">
          <Badge
            variant="light"
            color="grey"
            c="dark"
            size="m"
            radius="sm"
            className={classes.qtyBadge}
            onClick={() => onQtyChange(product.id, -1)}
            aria-label="Decrease quantity"
          >
            <IconMinus size={10} stroke={3} />
          </Badge>

          <Text size="sm" fw={600} className={classes.quantityText}>
            {quantity}
          </Text>

          <Badge
            variant="light"
            color="grey"
            c="dark"
            size="m"
            radius="sm"
            className={classes.qtyBadge}
            onClick={() => onQtyChange(product.id, 1)}
            aria-label="Increase quantity"
          >
            <IconPlus size={10} stroke={3} />
          </Badge>
        </Group>
      </Group>

      <Group justify="space-between" align="center">
        <Text size="lg" fw={600} c="dark">
          $ {product.price}
        </Text>

        <Button
          variant="filled"
          color="#dbf2e0"
          c="#388d4d"
          radius="mid"
          size="sm"
          rightSection={<IconShoppingCart size={16} />}
          onClick={() => onAddToCart(product)}
          className={classes.addButton}
        >
          Add to cart
        </Button>
      </Group>
    </Card>
  );
};
