import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  quantity: number;
  id: number;
  name: string;
  price: {
    amount: number;
    unit: string;
  };
  images: string;
}

interface CartState {
  Items: CartItem[];
  lastRemovedItems: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateQuantity: (id: number, quantity: number) => void;
  calculateSummary: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  bulkRemove: (ids: number[]) => void;
  undoRemove: () => void;
  clearCart: () => void;
  resetCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      Items: [
        {
          id: 1,
          name: "Cafe Orgánico",
          price: {
            amount: 100,
            unit: "$",
          },
          quantity: 1,
          images: "/images/tomatoes.jpg?height=80&width=80",
        },
        {
          id: 2,
          name: "Huevos de Campo",
          price: {
            amount: 200,
            unit: "$",
          },
          quantity: 2,
          images: "/images/eggs.jpg?height=80&width=80",
        },
      ],
      lastRemovedItems: [],
      subtotal: 0,
      shipping: 0,
      total: 0,
      loading: false,
      error: null,

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      updateQuantity: (id: number, quantity: number) => {
        set((state) => ({
          Items: state.Items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
        get().calculateSummary();
      },

      calculateSummary: () => {
        const Items = get().Items;
        const subtotal = Items.reduce(
          (acc, item) => acc + item.price.amount * item.quantity,
          0
        );
        const shipping = Items.length > 0 ? 10 : 0;
        set({ subtotal, total: subtotal + shipping });
      },

      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.Items.find((item) => item.id === newItem.id);
          if (existingItem) {
            return {
              Items: state.Items.map((item) =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item
              ),
            };
          } else {
            return { Items: [...state.Items, newItem] };
          }
        });
        get().calculateSummary();
      },

      removeItem: (id) => {
        set((state) => {
          const itemToRemove = state.Items.find(item => item.id === id) || null;
          return {
            lastRemovedItems: itemToRemove ? [itemToRemove] : [],
            Items: state.Items.filter((item) => item.id !== id),
          };
        });
        get().calculateSummary();
      },

      bulkRemove: (ids) => {
        set((state) => {
          const removedItems = state.Items.filter(item => ids.includes(item.id));
          return {
            lastRemovedItems: removedItems,
            Items: state.Items.filter((item) => !ids.includes(item.id)),
          };
        });
        get().calculateSummary();
      },

      undoRemove: () => set((state) => ({
        Items: [...state.Items, ...state.lastRemovedItems],
        lastRemovedItems: []
      })),

      clearCart: () => {
        set({ Items: [] });
        get().calculateSummary();
      },

      resetCart: () => {
        localStorage.removeItem("cart-storage");
        set({
          Items: [
            {
              id: 1,
              name: "Cafe Orgánico",
              price: {
                amount: 100,
                unit: "$",
              },
              quantity: 1,
              images: "/images/tomatoes.jpg?height=80&width=80",
            },
            {
              id: 2,
              name: "Huevos de Campo",
              price: {
                amount: 200,
                unit: "$",
              },
              quantity: 2,
              images: "/images/eggs.jpg?height=80&width=80",
            },
          ],
        });
        get().calculateSummary();
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        Items: state.Items,
        subtotal: state.subtotal,
        shipping: state.shipping,
        total: state.total,
      }),
    }
  )
);
