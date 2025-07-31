export interface InventoryProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  subCategory?: string;
  sku: string;
  barcode?: string;

  // Stock Information
  stockQuantity: number;
  minStockLevel: number;
  maxStockLevel: number;
  reservedQuantity: number;
  availableQuantity: number;

  // Status Management
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'discontinued';

  // Pricing
  price: {
    amount: number;
    unit: string;
    currency: string;
  };
  costPrice: {
    amount: number;
    unit: string;
    currency: string;
  };

  // Product Details
  images: string[];
  certifications: string[];
  farmingMethod: string;
  seasonality: string[];

  // Harvest & Production
  harvestDate: Date;
  expiryDate?: Date;
  productionBatch?: string;

  // Location & Storage
  storageLocation: {
    warehouse: string;
    section: string;
    shelf?: string;
  };

  // Supplier Information
  supplier: {
    id: string;
    name: string;
    contact: string;
  };

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  tags: string[];

  // Delivery Options
  availableForDelivery: boolean;
  pickupAvailable: boolean;

  // Quality Metrics
  rating: number;
  qualityScore: number;
}

export interface StockMovement {
  id: string;
  productId: string;
  type: 'in' | 'out' | 'adjustment' | 'reservation' | 'return';
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  reason: string;
  reference?: string; // PO number, invoice, etc.
  notes?: string;
  performedBy: string;
  performedAt: Date;
  location?: string;
}

export interface InventoryAdjustment {
  id: string;
  productId: string;
  adjustmentType: 'correction' | 'damage' | 'loss' | 'theft' | 'quality_control';
  quantity: number;
  reason: string;
  notes?: string;
  approvedBy?: string;
  approvedAt?: Date;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  createdBy: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  color?: string;
  icon?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryMetrics {
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  averageStockLevel: number;
  stockTurnoverRate: number;
  topProducts: Array<{
    productId: string;
    name: string;
    quantity: number;
    value: number;
  }>;
  recentMovements: StockMovement[];
}

export interface BulkOperation {
  id: string;
  type: 'import' | 'export' | 'update';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  fileName: string;
  totalRecords: number;
  processedRecords: number;
  failedRecords: number;
  errors: string[];
  createdAt: Date;
  completedAt?: Date;
  createdBy: string;
}

export interface InventoryFilters {
  category?: string;
  status?: string;
  supplier?: string;
  storageLocation?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
  tags?: string[];
}

export interface InventoryState {
  products: InventoryProduct[];
  categories: ProductCategory[];
  movements: StockMovement[];
  adjustments: InventoryAdjustment[];
  bulkOperations: BulkOperation[];
  metrics: InventoryMetrics;
  filters: InventoryFilters;
  isLoading: boolean;
  error: string | null;
}

export interface InventoryActions {
  // Product CRUD
  addProduct: (product: Omit<InventoryProduct, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<InventoryProduct>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => InventoryProduct | undefined;

  // Stock Management
  updateStock: (
    productId: string,
    quantity: number,
    type: StockMovement['type'],
    reason: string
  ) => void;
  reserveStock: (productId: string, quantity: number, reason: string) => void;
  releaseReservation: (productId: string, quantity: number) => void;

  // Adjustments
  createAdjustment: (adjustment: Omit<InventoryAdjustment, 'id' | 'createdAt'>) => void;
  approveAdjustment: (id: string, approvedBy: string) => void;
  rejectAdjustment: (id: string, reason: string) => void;

  // Categories
  addCategory: (category: Omit<ProductCategory, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCategory: (id: string, updates: Partial<ProductCategory>) => void;
  deleteCategory: (id: string) => void;

  // Bulk Operations
  startBulkOperation: (operation: Omit<BulkOperation, 'id' | 'createdAt'>) => void;
  updateBulkOperation: (id: string, updates: Partial<BulkOperation>) => void;

  // Filters and Search
  setFilters: (filters: Partial<InventoryFilters>) => void;
  clearFilters: () => void;

  // Metrics
  updateMetrics: () => void;

  // State Management
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}
