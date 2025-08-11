import { unstable_setRequestLocale } from 'next-intl/server';
import OrdersClient from './orders-client';

export default function OrdersPage() {
  // This sets the locale for the server component
  unstable_setRequestLocale('es');

  return <OrdersClient />;
}
