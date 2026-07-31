import { Popover, Button, Text, Stack, Group, Image, ActionIcon } from '@mantine/core';
import { IconShoppingCart, IconTrash } from '@tabler/icons-react';
import type { CartItem } from '../../types/product';
import classes from './CartPopover.module.css';

interface CartPopoverProps {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  onRemoveItem: (id: number) => void;
}

export const CartPopover = ({
  cartItems,
  totalItems,
  totalPrice,
  onRemoveItem,
}: CartPopoverProps) => {
  return (
    <Popover position="bottom-end" shadow="md" width={320}>
      <Popover.Target>
        <Button leftSection={<IconShoppingCart size={18} />} color="#54b46a" variant="filled">
          Cart: {totalItems} items (${totalPrice})
        </Button>
      </Popover.Target>

      <Popover.Dropdown>
        {cartItems.length === 0 ? (
          <Text c="dimmed" className={classes.emptyText}>
            Your cart is empty!
          </Text>
        ) : (
          <Stack gap="sm">
            {cartItems.map(({ product, quantity }) => (
              <Group key={product.id} justify="space-between">
                <Group gap="xs">
                  <Image src={product.image} w={30} h={30} radius="sm" alt={product.name} />
                  <div>
                    <Text size="sm" fw={500}>
                      {product.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      ${product.price} × {quantity}
                    </Text>
                  </div>
                </Group>

                <Group gap={4}>
                  <Text size="sm" className={classes.itemPrice}>
                    ${product.price * quantity}
                  </Text>
                  <ActionIcon
                    size="sm"
                    color="red"
                    variant="subtle"
                    onClick={() => onRemoveItem(product.id)}
                    aria-label={`Remove ${product.name}`}
                  >
                    <IconTrash size={14} />
                  </ActionIcon>
                </Group>
              </Group>
            ))}
          </Stack>
        )}
      </Popover.Dropdown>
    </Popover>
  );
};
