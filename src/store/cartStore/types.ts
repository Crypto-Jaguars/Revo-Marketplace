export interface Farmer {
  id: string;
  name: string;
  farmName: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

export interface Price {
  amount: number;
  unit: string;
}

export interface CartItem {
  id: number;
  name: string;
  description?: string;
  price: Price;
  discount?: number;
  quantity: number;
  images: string | string[];
  stockQuantity?: number;
  farmer?: Farmer;
  category?: string;
  subCategory?: string;
  certifications?: string[];
  farmingMethod?: string;
  availableForDelivery?: boolean;
  pickupAvailable?: boolean;
  rating?: number;
}

export interface CartState {
  Items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  loading: boolean;
  error: string | null;
  isOpen: boolean;
  lastRemovedItems: CartItem[];

  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  calculateSummary: () => void;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  bulkRemove: (ids: number[]) => Promise<void>;
  undoRemove: () => void;
  resetCart: () => void;
  clearCart: () => Promise<void>;
  toggleCart: () => void;
}
