import { unstable_setRequestLocale } from 'next-intl/server';
import OrdersClient from './orders-client';

export default function OrdersPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <OrdersClient />;
}
