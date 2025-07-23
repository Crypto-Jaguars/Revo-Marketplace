import React from 'react';
import { ShoppingCart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface CartWidgetProps {
  className?: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CartWidget = ({ className }: CartWidgetProps) => {
  const t = useTranslations('Marketplace');

  const cartItems: CartItem[] = [
    { id: 1, name: 'Organic Tomatoes', price: 4.99, quantity: 2 },
    { id: 2, name: 'Fresh Apples', price: 3.99, quantity: 1 },
  ];

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn('relative', className)}>
          <ShoppingCart className="h-6 w-6 text-[#375B42] dark:bg-background-dark" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white-dark text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>{t('cart.title')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {cartItems.length === 0 ? (
          <DropdownMenuItem disabled>{t('cart.empty')}</DropdownMenuItem>
        ) : (
          <>
            {cartItems.map((item) => (
              <DropdownMenuItem key={item.id} className="flex justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-gray-500">
                    {t('cart.quantity', { count: item.quantity })}
                  </span>
                </div>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <div className="p-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">{t('cart.total')}</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-[#375B42] dark:bg-background-dark hover:bg-[#375B42] dark:hover:bg-[#2C4733]">
                {t('cart.checkout')}
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartWidget;
