"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Order } from "./types";
import { OrderStatus } from "./OrderStatus";
import { useTranslations } from 'next-intl';

interface OrderListProps {
  orders: Order[];
  onViewDetails: (orderId: string) => void;
}

export function OrderList({ orders, onViewDetails }: OrderListProps) {
  const t = useTranslations('OrderHistory');

  return (
    <div className="rounded-md border p-[2rem]">
      <Table>
        <TableHeader>
          <h1 className="text-2xl font-bold">Your Orders</h1>
          <TableRow>
            <TableHead>{t('table.orderId')}</TableHead>
            <TableHead>{t('table.date')}</TableHead>
            <TableHead>{t('table.total')}</TableHead>
            <TableHead>{t('table.status')}</TableHead>
            <TableHead>{t('table.seller')}</TableHead>
            <TableHead className="text-right">{t('table.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.date.toLocaleDateString()}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <OrderStatus status={order.status} />
              </TableCell>
              <TableCell>{order.seller.name}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" className="border" onClick={() => onViewDetails(order.id)}>
                  {t('details.title')}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}