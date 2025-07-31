'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { InventoryState, InventoryActions } from './types';
import { generateId } from '@/lib/utils';
import {
  mockInventoryProducts,
  mockStockMovements,
  mockInventoryAdjustments,
  mockProductCategories,
} from '@/mocks/inventory';

const initialMetrics = {
  totalProducts: 0,
  totalValue: 0,
  lowStockItems: 0,
  outOfStockItems: 0,
  averageStockLevel: 0,
  stockTurnoverRate: 0,
  topProducts: [],
  recentMovements: [],
};

const initialFilters = {
  category: undefined,
  status: undefined,
  supplier: undefined,
  storageLocation: undefined,
  dateRange: undefined,
  search: undefined,
  tags: undefined,
};

export const useInventoryStore = create<InventoryState & InventoryActions>()(
  persist(
    (set, get) => ({
      // Initial State
      products: mockInventoryProducts,
      categories: mockProductCategories,
      movements: mockStockMovements,
      adjustments: mockInventoryAdjustments,
      bulkOperations: [],
      metrics: initialMetrics,
      filters: initialFilters,
      isLoading: false,
      error: null,

      // Product CRUD Operations
      addProduct: (productData) => {
        const newProduct = {
          ...productData,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
          availableQuantity: productData.stockQuantity - productData.reservedQuantity,
        };

        set((state) => ({
          products: [...state.products, newProduct],
        }));

        get().updateMetrics();
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id
              ? {
                  ...product,
                  ...updates,
                  updatedAt: new Date(),
                  availableQuantity:
                    (updates.stockQuantity ?? product.stockQuantity) -
                    (updates.reservedQuantity ?? product.reservedQuantity),
                }
              : product
          ),
        }));

        get().updateMetrics();
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        }));

        get().updateMetrics();
      },

      getProduct: (id) => {
        return get().products.find((product) => product.id === id);
      },

      // Stock Management
      updateStock: (productId, quantity, type, reason) => {
        const product = get().getProduct(productId);
        if (!product) return;

        const previousQuantity = product.stockQuantity;
        let newQuantity = previousQuantity;

        switch (type) {
          case 'in':
            newQuantity = previousQuantity + quantity;
            break;
          case 'out':
            newQuantity = Math.max(0, previousQuantity - quantity);
            break;
          case 'adjustment':
            newQuantity = quantity;
            break;
          default:
            return;
        }

        const movement = {
          id: generateId(),
          productId,
          type,
          quantity,
          previousQuantity,
          newQuantity,
          reason,
          performedBy: 'current-user', // TODO: Get from auth
          performedAt: new Date(),
        };

        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId
              ? {
                  ...p,
                  stockQuantity: newQuantity,
                  availableQuantity: newQuantity - p.reservedQuantity,
                  updatedAt: new Date(),
                }
              : p
          ),
          movements: [movement, ...state.movements],
        }));

        get().updateMetrics();
      },

      reserveStock: (productId, quantity, reason) => {
        const product = get().getProduct(productId);
        if (!product || product.availableQuantity < quantity) return;

        const movement = {
          id: generateId(),
          productId,
          type: 'reservation' as const,
          quantity,
          previousQuantity: product.reservedQuantity,
          newQuantity: product.reservedQuantity + quantity,
          reason,
          performedBy: 'current-user',
          performedAt: new Date(),
        };

        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId
              ? {
                  ...p,
                  reservedQuantity: p.reservedQuantity + quantity,
                  availableQuantity: p.availableQuantity - quantity,
                  updatedAt: new Date(),
                }
              : p
          ),
          movements: [movement, ...state.movements],
        }));

        get().updateMetrics();
      },

      releaseReservation: (productId, quantity) => {
        const product = get().getProduct(productId);
        if (!product) return;

        const movement = {
          id: generateId(),
          productId,
          type: 'return' as const,
          quantity,
          previousQuantity: product.reservedQuantity,
          newQuantity: Math.max(0, product.reservedQuantity - quantity),
          reason: 'Reservation released',
          performedBy: 'current-user',
          performedAt: new Date(),
        };

        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId
              ? {
                  ...p,
                  reservedQuantity: Math.max(0, p.reservedQuantity - quantity),
                  availableQuantity: p.availableQuantity + quantity,
                  updatedAt: new Date(),
                }
              : p
          ),
          movements: [movement, ...state.movements],
        }));

        get().updateMetrics();
      },

      // Adjustments
      createAdjustment: (adjustmentData) => {
        const adjustment = {
          ...adjustmentData,
          id: generateId(),
          createdAt: new Date(),
        };

        set((state) => ({
          adjustments: [...state.adjustments, adjustment],
        }));
      },

      approveAdjustment: (id, approvedBy) => {
        const adjustment = get().adjustments.find((a) => a.id === id);
        if (!adjustment) return;

        // Apply the adjustment to stock
        get().updateStock(
          adjustment.productId,
          adjustment.quantity,
          'adjustment',
          `Approved: ${adjustment.reason}`
        );

        set((state) => ({
          adjustments: state.adjustments.map((a) =>
            a.id === id
              ? {
                  ...a,
                  status: 'approved',
                  approvedBy,
                  approvedAt: new Date(),
                }
              : a
          ),
        }));
      },

      rejectAdjustment: (id, reason) => {
        set((state) => ({
          adjustments: state.adjustments.map((a) =>
            a.id === id
              ? {
                  ...a,
                  status: 'rejected',
                  notes: a.notes ? `${a.notes}\nRejected: ${reason}` : `Rejected: ${reason}`,
                }
              : a
          ),
        }));
      },

      // Categories
      addCategory: (categoryData) => {
        const category = {
          ...categoryData,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          categories: [...state.categories, category],
        }));
      },

      updateCategory: (id, updates) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === id
              ? {
                  ...category,
                  ...updates,
                  updatedAt: new Date(),
                }
              : category
          ),
        }));
      },

      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== id),
        }));
      },

      // Bulk Operations
      startBulkOperation: (operationData) => {
        const operation = {
          ...operationData,
          id: generateId(),
          createdAt: new Date(),
        };

        set((state) => ({
          bulkOperations: [...state.bulkOperations, operation],
        }));
      },

      updateBulkOperation: (id, updates) => {
        set((state) => ({
          bulkOperations: state.bulkOperations.map((operation) =>
            operation.id === id
              ? {
                  ...operation,
                  ...updates,
                  completedAt: updates.status === 'completed' ? new Date() : operation.completedAt,
                }
              : operation
          ),
        }));
      },

      // Filters and Search
      setFilters: (filters) => {
        set((state) => ({
          filters: { ...state.filters, ...filters },
        }));
      },

      clearFilters: () => {
        set({ filters: initialFilters });
      },

      // Metrics Update
      updateMetrics: () => {
        const { products, movements } = get();

        const totalProducts = products.length;
        const totalValue = products.reduce(
          (sum, product) => sum + product.price.amount * product.stockQuantity,
          0
        );
        const lowStockItems = products.filter((p) => p.status === 'low_stock').length;
        const outOfStockItems = products.filter((p) => p.status === 'out_of_stock').length;
        const averageStockLevel =
          totalProducts > 0
            ? products.reduce((sum, p) => sum + p.stockQuantity, 0) / totalProducts
            : 0;

        const topProducts = products
          .sort((a, b) => b.stockQuantity - a.stockQuantity)
          .slice(0, 5)
          .map((p) => ({
            productId: p.id,
            name: p.name,
            quantity: p.stockQuantity,
            value: p.price.amount * p.stockQuantity,
          }));

        const recentMovements = movements.slice(0, 10);

        set({
          metrics: {
            totalProducts,
            totalValue,
            lowStockItems,
            outOfStockItems,
            averageStockLevel,
            stockTurnoverRate: 0, // TODO: Calculate based on historical data
            topProducts,
            recentMovements,
          },
        });
      },

      // State Management
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      reset: () =>
        set({
          products: [],
          categories: [],
          movements: [],
          adjustments: [],
          bulkOperations: [],
          metrics: initialMetrics,
          filters: initialFilters,
          isLoading: false,
          error: null,
        }),
    }),
    {
      name: 'inventory-store',
      partialize: (state) => ({
        products: state.products,
        categories: state.categories,
        movements: state.movements,
        adjustments: state.adjustments,
        bulkOperations: state.bulkOperations,
      }),
    }
  )
);
