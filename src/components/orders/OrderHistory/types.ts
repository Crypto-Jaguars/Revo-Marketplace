export type OrderStatus = "pending" | "processing" | "delivered" | "cancelled";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface SellerInfo {
  id: string;
  name: string;
  rating: number;
}

export interface EscrowDetails {
  contractId: string;
  status: string;
  milestones: {
    name: string;
    completed: boolean;
    date?: Date;
  }[];
}

export interface ShippingInfo {
  address: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  status: string;
}

export interface PaymentDetails {
  method: string;
  status: string;
  total: number;
  currency: string;
}

export interface Order {
  id: string;
  date: Date;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  seller: SellerInfo;
  escrowContract: EscrowDetails;
  shipping: ShippingInfo;
  paymentInfo: PaymentDetails;
}

export interface OrderFilters {
  search: string;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  status: OrderStatus | "all";
  sortBy: string;
  minAmount: number;
  maxAmount: number;
}