"use client"
import { ShoppingCart, Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cartStore/store"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface CartDropdownProps {
  className?: string
}

export default function CartDropdown({ className }: CartDropdownProps) {
  const { Items, subtotal, loading } = useCartStore()

  // Calculate total items in cart
  const cartCount = Items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn("relative", className)}>
          <ShoppingCart className="h-6 w-6 text-[#375B42] dark:bg-background-dark" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Your Cart</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {loading && (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-[#375B42]" />
          </div>
        )}

        {!loading && Items.length === 0 ? (
          <DropdownMenuItem disabled>Your cart is empty</DropdownMenuItem>
        ) : (
          <>
            {!loading &&
              Items.map((item) => {
                // Calculate price with discount if applicable
                const discountMultiplier = item.discount ? (100 - item.discount) / 100 : 1
                const itemPrice = item.price.amount * discountMultiplier
                const itemTotal = itemPrice * item.quantity

                return (
                  <DropdownMenuItem key={item.id} className="flex justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-500">Quantity: {item.quantity}</span>
                      {item.discount && item.discount > 0 && (
                        <span className="text-xs text-red-500">{item.discount}% off</span>
                      )}
                    </div>
                    <span className="font-medium">${itemTotal.toFixed(2)}</span>
                  </DropdownMenuItem>
                )
              })}
            <DropdownMenuSeparator />
            <div className="p-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  asChild
                  className="w-full bg-[#375B42] dark:bg-background-dark hover:bg-[#375B42]/90 dark:hover:bg-[#2C4733]"
                >
                  <Link href="/en/cart">View Cart</Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-[#375B42] text-[#375B42]">
                  <Link href="/en/checkout">Checkout</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}