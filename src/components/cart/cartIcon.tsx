'use client';

import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore/store';
import { Button } from '@/components/ui/button';

export default function CartIcon() {
  const { toggleCart, Items } = useCartStore();

  // Calculate total items
  const totalItems = Items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={toggleCart}
      aria-label={`Shopping cart with ${totalItems} items`}
    >
      <ShoppingCart className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Button>
  );
}
