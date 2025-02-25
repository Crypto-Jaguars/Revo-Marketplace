"use client";

import { useState, useCallback, useMemo } from "react";
import { OrderHistoryLayout } from "@/components/orders/OrderHistory/OrderHistoryLayout";
import { OrderFilter } from "@/components/orders/OrderHistory/OrderFilter";
import { OrderList } from "@/components/orders/OrderHistory/OrderList";
import { OrderDetails } from "@/components/orders/OrderHistory/OrderDetails";
import { filterOrders, sortOrders } from "@/components/orders/OrderHistory/utils";
import type { Order, OrderFilters } from "@/components/orders/OrderHistory/types";

const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    date: new Date("2024-02-23"),
    status: "delivered",
    items: [
      { id: "ITEM-1", name: "Organic Apples", quantity: 5, price: 10.0 },
      { id: "ITEM-2", name: "Fresh Carrots", quantity: 2, price: 4.0 },
    ],
    total: 50.0,
    seller: { id: "SELLER-1", name: "Farm Fresh Produce", rating: 4.8 },
    escrowContract: {
      contractId: "ESC-001",
      status: "completed",
      milestones: [
        { name: "Order Placed", completed: true, date: new Date("2024-02-20") },
        { name: "Payment Confirmed", completed: true, date: new Date("2024-02-21") },
        { name: "Shipped", completed: true, date: new Date("2024-02-22") },
      ],
    },
    shipping: {
      address: "123 Main St\nApt 4B\nNew York, NY 10001",
      trackingNumber: "TRK123456789",
      estimatedDelivery: new Date("2024-02-24"),
      status: "delivered",
    },
    paymentInfo: { method: "Credit Card", status: "completed", total: 50.0, currency: "USD" },
  },
  {
    id: "ORD-002",
    date: new Date("2024-02-20"),
    status: "processing",
    items: [
      { id: "ITEM-3", name: "Wireless Headphones", quantity: 1, price: 120.0 },
      { id: "ITEM-4", name: "USB-C Charger", quantity: 2, price: 15.0 },
    ],
    total: 150.0,
    seller: { id: "SELLER-2", name: "Tech Gadgets Inc.", rating: 4.5 },
    escrowContract: {
      contractId: "ESC-002",
      status: "in-progress",
      milestones: [
        { name: "Order Placed", completed: true, date: new Date("2024-02-18") },
        { name: "Payment Confirmed", completed: true, date: new Date("2024-02-19") },
        { name: "Shipped", completed: false },
      ],
    },
    shipping: {
      address: "456 Tech Ave\nSuite 10\nSan Francisco, CA 94107",
      trackingNumber: "TRK987654321",
      estimatedDelivery: new Date("2024-02-25"),
      status: "in-transit",
    },
    paymentInfo: { method: "PayPal", status: "pending", total: 150.0, currency: "USD" },
  },
  {
    id: "ORD-003",
    date: new Date("2024-02-15"),
    status: "cancelled",
    items: [
      { id: "ITEM-5", name: "Leather Jacket", quantity: 1, price: 200.0 },
      { id: "ITEM-6", name: "Wool Scarf", quantity: 1, price: 30.0 },
    ],
    total: 230.0,
    seller: { id: "SELLER-3", name: "Fashion Trends", rating: 4.2 },
    escrowContract: {
      contractId: "ESC-003",
      status: "cancelled",
      milestones: [
        { name: "Order Placed", completed: true, date: new Date("2024-02-10") },
        { name: "Payment Confirmed", completed: true, date: new Date("2024-02-11") },
        { name: "Shipped", completed: false },
      ],
    },
    shipping: {
      address: "789 Fashion St\nUnit 5\nLos Angeles, CA 90001",
      trackingNumber: undefined,
      estimatedDelivery: undefined,
      status: "cancelled",
    },
    paymentInfo: { method: "Credit Card", status: "refunded", total: 230.0, currency: "USD" },
  },
  {
    id: "ORD-004",
    date: new Date("2024-02-10"),
    status: "pending",
    items: [
      { id: "ITEM-7", name: "Smartwatch", quantity: 1, price: 250.0 },
      { id: "ITEM-8", name: "Screen Protector", quantity: 1, price: 10.0 },
    ],
    total: 260.0,
    seller: { id: "SELLER-4", name: "Wearable Tech", rating: 4.7 },
    escrowContract: {
      contractId: "ESC-004",
      status: "pending",
      milestones: [
        { name: "Order Placed", completed: true, date: new Date("2024-02-08") },
        { name: "Payment Confirmed", completed: true, date: new Date("2024-02-09") },
        { name: "Shipped", completed: false },
      ],
    },
    shipping: {
      address: "101 Tech Lane\nApt 3\nSeattle, WA 98101",
      trackingNumber: undefined,
      estimatedDelivery: undefined,
      status: "pending",
    },
    paymentInfo: { method: "Credit Card", status: "pending", total: 260.0, currency: "USD" },
  },
  {
    id: "ORD-005",
    date: new Date("2024-02-05"),
    status: "delivered",
    items: [
      { id: "ITEM-9", name: "Coffee Maker", quantity: 1, price: 80.0 },
      { id: "ITEM-10", name: "Coffee Beans", quantity: 2, price: 15.0 },
    ],
    total: 110.0,
    seller: { id: "SELLER-5", name: "Home Essentials", rating: 4.6 },
    escrowContract: {
      contractId: "ESC-005",
      status: "completed",
      milestones: [
        { name: "Order Placed", completed: true, date: new Date("2024-02-01") },
        { name: "Payment Confirmed", completed: true, date: new Date("2024-02-02") },
        { name: "Shipped", completed: true, date: new Date("2024-02-03") },
      ],
    },
    shipping: {
      address: "202 Kitchen St\nUnit 12\nChicago, IL 60601",
      trackingNumber: "TRK112233445",
      estimatedDelivery: new Date("2024-02-06"),
      status: "delivered",
    },
    paymentInfo: { method: "Debit Card", status: "completed", total: 110.0, currency: "USD" },
  },
];

const initialFilters: OrderFilters = {
  search: "",
  dateRange: { start: null, end: null },
  status: "all",
  sortBy: "date-desc",
  minAmount: 0,
  maxAmount: 0,
};

export default function OrderHistoryPage() {
  const [filters, setFilters] = useState<OrderFilters>(initialFilters);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(() => {
    const filtered = filterOrders(sampleOrders, filters);
    return sortOrders(filtered, filters.sortBy);
  }, [filters]);


  const handleViewDetails = useCallback((orderId: string) => {
    const order = sampleOrders.find((o) => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
    } else {
      console.error(`Order ${orderId} not found`);
    }
  }, []);

  const handleBack = useCallback(() => setSelectedOrder(null), []);
  const handleFilterChange = useCallback((newFilters: OrderFilters) => setFilters(newFilters), []);

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-background">
        <OrderDetails order={selectedOrder} onBack={handleBack} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <OrderHistoryLayout
        sidebar={<OrderFilter filters={filters} onFilterChange={handleFilterChange} />}
        content={<OrderList orders={filteredOrders} onViewDetails={handleViewDetails} />}
      />
    </div>
  );
}