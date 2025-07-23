import { cn } from '@/lib/utils';
import type { OrderStatus as OrderStatusType } from './types';

interface OrderStatusProps {
  status: OrderStatusType;
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <span
      className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', {
        'bg-yellow-100 text-yellow-800': status === 'pending',
        'bg-blue-100 text-blue-800': status === 'processing',
        'bg-green-100 text-green-800': status === 'delivered',
        'bg-red-100 text-red-800': status === 'cancelled',
      })}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
