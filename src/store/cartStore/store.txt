import { create } from "zustand";
import { persist } from "zustand/middleware";



interface CartItem {
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
  subtotal: number;
  shipping: number;
  total: number;
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  calculateSummary: () => void;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

/*interface CartState {
  Items: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  subtotal: number;
  shipping: number;
  total: number;
  calculateSummary: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  loading: boolean;
  error: string | null;
  
}*/

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      Items: [
        {
          id: 1,
          name: "Cafe",
          price: {
            amount: 100,
            unit: "$",
          },
          quantity: 1,
          images: "/images/tomatoes.jpg?height=80&width=80",
        },
        {
          id: 2,
          name: "Cafe",
          price: {
            amount: 200,
            unit: "$",
          },
          quantity: 2,
          images: "/images/eggs.jpg?height=80&width=80",
        },
      ],
      subtotal: 0,
      shipping: 0, // Static shipping value
      total: 0,
      loading: false,
      error: null,
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      updateQuantity: async (id: number, quantity: number) => {
        try {
            if (quantity <= 0) {
            throw new Error("Quantity must be greater than zero");
               }
          set({ loading: true, error: null });
          // Simulate async operation
          await new Promise((resolve) => setTimeout(resolve, 500));
          set((state) => ({
            Items: state.Items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          }));
          get().calculateSummary();
        } catch (err) {
          set({ error: "Failed to update quantity" });
        } finally {
          set({ loading: false });
        }
      },
      calculateSummary: () => {
        const Items = get().Items;
        const subtotal = Items.reduce(
          (acc, item) => acc + item.price.amount * item.quantity,
          0
        );
        const shipping = get().shipping;
        set({ subtotal, total: subtotal + shipping });
      },
      addItem: async (newItem) => {
        try {
          set({ loading: true, error: null });
          // Simulate async operation
          await new Promise((resolve) => setTimeout(resolve, 500));
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
        } catch (err) {
          set({ error: "Failed to add item" });
        } finally {
          set({ loading: false });
        }
      },
      removeItem: async (id) => {
        try {
          set({ loading: true, error: null });
          // Simulate async operation
          await new Promise((resolve) => setTimeout(resolve, 500));
          set((state) => ({
            Items: state.Items.filter((item) => item.id !== id),
          }));
          get().calculateSummary();
        } catch (err) {
          set({ error: "Failed to remove item" });
        } finally {
          set({ loading: false });
        }
      },
      clearCart: async () => {
        try {
          set({ loading: true, error: null });
          // Simulate async operation
          await new Promise((resolve) => setTimeout(resolve, 500));
          set({ Items: [] });
          get().calculateSummary();
        } catch (err) {
          set({ error: "Failed to clear cart" });
        } finally {
          set({ loading: false });
        }
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




  /*persist(
    (set, get) => ({
      cartItems: [],
      subtotal: 0,
      shipping: 0,
      total: 0,
      addItem: (item) => {
        const existingItem = get().cartItems.find((i) => i.id === item.id);
        if (existingItem) {
          set((state) => ({
            cartItems: state.cartItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          }));
        } else {
          set((state) => ({ cartItems: [...state.cartItems, item] }));
        }
        get().calculateTotals();
      },
      removeItem: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        }));
        get().calculateTotals();
      },
      updateItemQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
        } else {
          set((state) => ({
            cartItems: state.cartItems.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          }));
        }
        get().calculateTotals();
      },
      clearCart: () => {
        set({ cartItems: [], subtotal: 0, shipping: 0, total: 0 });
      },
      calculateTotals: () => {
        const cartItems = get().cartItems;
        const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = subtotal > 0 ? 10 : 0; // Flat shipping rate for simplicity
        const total = subtotal + shipping;
        set({ subtotal, shipping, total });
      },
    }),
    {
      name: "cart-storage", // Key for local storage persistence
    }
  )*/




      //subtotal: number;
 // shipping: number;
  //total: number;
  /*addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotals: () => void;*/

  // Types for Cart Items
/*export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string; // For displaying images in the cart
}*/
