'use client';

import { ArrowLeft, Package, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Order } from './types';
import { OrderStatus } from './OrderStatus';
import { useTranslations } from 'next-intl';

interface OrderDetailsProps {
  order: Order;
  onBack: () => void;
}

export function OrderDetails({ order, onBack }: OrderDetailsProps) {
  const t = useTranslations('OrderHistory');

  return (
    <div className="space-y-6 p-[5rem]">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">{t('details.title')}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('details.orderInfo.title')}</CardTitle>
            <CardDescription>Order #{order.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('details.orderInfo.status')}</span>
              <OrderStatus status={order.status} />
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('details.orderInfo.date')}</span>
              <span>{order.date.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('details.orderInfo.total')}</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('details.sellerInfo.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('details.sellerInfo.name')}</span>
              <span>{order.seller.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('details.sellerInfo.rating')}</span>
              <span>{order.seller.rating}/5</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t('details.items.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Package className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {t('details.items.quantity')}: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('details.shipping.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">{t('details.shipping.address')}</p>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {order.shipping.address}
                </p>
              </div>
            </div>
            {order.shipping.trackingNumber && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t('details.shipping.trackingNumber')}
                </span>
                <span>{order.shipping.trackingNumber}</span>
              </div>
            )}
            {order.shipping.estimatedDelivery && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t('details.shipping.estimatedDelivery')}
                </span>
                <span>{order.shipping.estimatedDelivery.toLocaleDateString()}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('details.payment.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('details.payment.method')}</span>
              <span>{order.paymentInfo.method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('details.payment.status')}</span>
              <span>{order.paymentInfo.status}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>{t('details.payment.total')}</span>
              <span>
                {order.paymentInfo.currency} ${order.paymentInfo.total.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
