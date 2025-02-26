import type { CartItem as StoreCartItem } from "@/store/cartStore/types"

export type CartItemProps = {
  item: StoreCartItem
  onRemove: (id: string) => void
  onUpdateQuantity: (id: string, quantity: number) => void
  onSaveForLater: (id: string) => void
}

export type CartSummaryProps = {
  subtotal: number
  tax: number
  escrowFee: number
  total: number
  onCheckout: () => void
}

export type CartDropdownProps = {
  isOpen: boolean
  onClose: () => void
}

