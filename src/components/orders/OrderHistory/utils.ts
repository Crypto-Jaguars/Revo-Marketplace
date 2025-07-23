import { Order, OrderFilters, OrderStatus } from './types';

export const filterOrders = (orders: Order[], filters: OrderFilters): Order[] => {
  return orders
    .filter((order) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          order.id.toLowerCase().includes(searchLower) ||
          order.items.some((item) => item.name.toLowerCase().includes(searchLower)) ||
          order.seller.name.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter((order) => {
      const { start, end } = filters.dateRange;
      if (start && order.date < start) return false;
      if (end && order.date > end) return false;
      return true;
    })
    .filter((order) => {
      if (filters.status !== 'all') return order.status === filters.status;
      return true;
    })
    .filter((order) => {
      if (filters.minAmount && order.total < filters.minAmount) return false;
      if (filters.maxAmount && order.total > filters.maxAmount) return false;
      return true;
    });
};

export const sortOrders = (orders: Order[], sortBy: string): Order[] => {
  const sortFunctions = {
    'date-desc': (a: Order, b: Order) => b.date.getTime() - a.date.getTime(),
    'date-asc': (a: Order, b: Order) => a.date.getTime() - b.date.getTime(),
    'total-desc': (a: Order, b: Order) => b.total - a.total,
    'total-asc': (a: Order, b: Order) => a.total - b.total,
  };
  return [...orders].sort(sortFunctions[sortBy as keyof typeof sortFunctions]);
};
