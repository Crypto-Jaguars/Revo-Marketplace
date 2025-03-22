'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ArrowLeft, Printer, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface OrderProps {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  items: OrderItem[];
}

interface OrderDetailClientProps {
  order: OrderProps;
  orderId: string;
}

export default function OrderDetailClient({ order, orderId }: OrderDetailClientProps) {
  const t = useTranslations('OrderDetail');
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('backToOrders')}
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            {t('printOrder')}
          </Button>
          <Button variant="outline" size="sm" disabled={order.status === 'delivered' || order.status === 'cancelled'}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            {t('trackOrder')}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>{t('order')} #{orderId}</CardTitle>
              <CardDescription>
                {t('placed')} {format(new Date(order.date), 'PPP')}
              </CardDescription>
            </div>
            <Badge className={getStatusColor(order.status)}>
              {t(order.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium mb-2">{t('shippingAddress')}</h3>
              <div className="text-sm text-muted-foreground">
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">{t('paymentMethod')}</h3>
              <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-medium mb-4">{t('orderItems')}</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                  <div className="h-16 w-16 bg-muted rounded flex-shrink-0">
                    {/* Use Next Image component in a real app */}
                    <Image 
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover rounded"
                      width={64}
                      height={64}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{t('quantity')}: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/50 p-6">
          <div>
            <p className="text-sm text-muted-foreground">{t('subtotal')}: ${order.total.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">{t('shipping')}: $0.00</p>
            <p className="text-sm text-muted-foreground">{t('tax')}: $0.00</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-lg">{t('total')}: ${order.total.toFixed(2)}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
