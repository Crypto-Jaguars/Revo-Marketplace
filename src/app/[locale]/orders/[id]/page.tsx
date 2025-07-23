import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import OrderDetailClient from './order-detail-client';

type Props = {
  params: {
    locale: string;
    id: string;
  };
};

export default async function OrderDetailPage({ params }: Props) {
  // Set the locale for server components
  unstable_setRequestLocale(params.locale);

  // Get translations for server components
  const t = await getTranslations('OrderDetail');

  // In a real app, you would fetch order data from an API or database
  // For this example, we'll create mock data based on the ID
  const mockOrder = {
    id: params.id,
    date: '2023-06-15',
    status: 'processing' as const,
    total: 249.99,
    shippingAddress: {
      name: 'Jane Smith',
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'USA',
    },
    paymentMethod: 'Credit Card (ending in 4242)',
    items: [
      {
        id: 'PROD-001',
        name: 'Wireless Headphones',
        price: 99.99,
        quantity: 1,
        image: '/images/placeholder.svg',
      },
      {
        id: 'PROD-002',
        name: 'Smart Watch',
        price: 149.99,
        quantity: 1,
        image: '/images/placeholder.svg',
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {t('orderDetails')} {params.id}
      </h1>

      <OrderDetailClient order={mockOrder} orderId={params.id} />
    </div>
  );
}
