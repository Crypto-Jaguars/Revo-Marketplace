"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartState } from "./types"

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      Items: [],
      subtotal: 0,
      shipping: 10, // Default shipping cost
      total: 0,
      loading: false,
      error: null,
      isOpen: false,

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      updateQuantity: async (id: number, quantity: number) => {
        try {
          if (quantity <= 0) {
            throw new Error("Quantity must be greater than zero")
          }

          set({ loading: true, error: null })

          // Check stock quantity if available
          const item = get().Items.find((item) => item.id === id)
          if (item?.stockQuantity && quantity > item.stockQuantity) {
            throw new Error(`Only ${item.stockQuantity} items available in stock`)
          }

          // Simulate async operation
          await new Promise((resolve) => setTimeout(resolve, 300))

          set((state) => ({
            Items: state.Items.map((item) => (item.id === id ? { ...item, quantity } : item)),
          }))

          get().calculateSummary()
        } catch (err: any) {
          set({ error: err.message || "Failed to update quantity" })
        } finally {
          set({ loading: false })
        }
      },

      calculateSummary: () => {
        const Items = get().Items
        const subtotal = Items.reduce((acc, item) => {
          // Apply discount if available
          const discountMultiplier = item.discount ? (100 - item.discount) / 100 : 1
          return acc + item.price.amount * discountMultiplier * item.quantity
        }, 0)
        const shipping = get().shipping
        set({ subtotal, total: subtotal + shipping })
      },

      addItem: async (newItem) => {
        try {
          set({ loading: true, error: null })

          // Simulate async operation
          await new Promise((resolve) => setTimeout(resolve, 300))

          set((state) => {
            const existingItem = state.Items.find((item) => item.id === newItem.id)

            if (existingItem) {
              // Check stock quantity if available
              const newQuantity = existingItem.quantity + newItem.quantity
              const maxQuantity = existingItem.stockQuantity || Number.MAX_SAFE_INTEGER

              return {
                Items: state.Items.map((item) =>
                  item.id === newItem.id
                    ? {
                        ...item,
                        quantity: Math.min(newQuantity, maxQuantity),
                      }
                    : item,
                ),
              }
            } else {
              return { Items: [...state.Items, newItem] }
            }
          })

          get().calculateSummary()
        } catch (err) {
          set({ error: "Failed to add item" })
        } finally {
          set({ loading: false })
        }
      },

      removeItem: async (id) => {
        try {
          set({ loading: true, error: null })

          // Simulate async operation
          await new Promise((resolve) => setTimeout(resolve, 300))

          set((state) => ({
            Items: state.Items.filter((item) => item.id !== id),
          }))

          get().calculateSummary()
        } catch (err) {
          set({ error: "Failed to remove item" })
        } finally {
          set({ loading: false })
        }
      },

      clearCart: async () => {
        try {
          set({ loading: true, error: null })

          // Simulate async operation
          await new Promise((resolve) => setTimeout(resolve, 300))

          set({ Items: [] })
          get().calculateSummary()
        } catch (err) {
          set({ error: "Failed to clear cart" })
        } finally {
          set({ loading: false })
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
        isOpen: state.isOpen,
      }),
    },
  ),
)

