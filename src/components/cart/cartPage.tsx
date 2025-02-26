"use client"

import { useState } from "react"
import { useCartStore } from "@/store/cartStore/store"
import CartItemComponent from "./cartItem"
import CartSummary from "./cartSummary"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, Truck, Store } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CartPage() {
  const { Items, removeItem, updateQuantity, clearCart, subtotal, shipping, total, loading, error } = useCartStore()

  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Group items by farmer
  const itemsByFarmer = Items.reduce(
    (acc, item) => {
      if (item.farmer) {
        const farmerId = item.farmer.id
        if (!acc[farmerId]) {
          acc[farmerId] = []
        }
        acc[farmerId].push(item)
      } else {
        // For items without farmer info, group under "other"
        if (!acc["other"]) {
          acc["other"] = []
        }
        acc["other"].push(item)
      }
      return acc
    },
    {} as Record<string, typeof Items>,
  )

  // Calculate subtotal by farmer
  const subtotalByFarmer = Object.entries(itemsByFarmer).reduce(
    (acc, [farmerId, items]) => {
      acc[farmerId] = items.reduce((total, item) => {
        const discountMultiplier = item.discount ? (100 - item.discount) / 100 : 1
        return total + item.price.amount * discountMultiplier * item.quantity
      }, 0)
      return acc
    },
    {} as Record<string, number>,
  )

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false)
      // Navigate to checkout or show success
      alert("Proceeding to checkout!")
    }, 1500)
  }

  if (Items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
        <div className="bg-muted/30 rounded-lg p-12 text-center">
          <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any agricultural products to your cart yet.
          </p>
          <Button asChild className="bg-[#375B42] dark:bg-background-dark hover:bg-[#375B42] dark:hover:bg-[#2C4733]">
            <a href="/en/products">Browse Products</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">
                {Items.length} {Items.length === 1 ? "Item" : "Items"}
              </h2>
              <Button variant="outline" size="sm" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>

            {/* Group items by farmer */}
            {Object.entries(itemsByFarmer).map(([farmerId, farmerItems]) => {
              // Skip rendering if no items
              if (farmerItems.length === 0) return null

              // Get farmer info from first item if available
              const farmer = farmerItems[0].farmer

              return (
                <div key={farmerId} className="mb-8">
                  {farmer && (
                    <div className="flex items-center gap-2 mb-4 p-2 bg-muted/30 rounded">
                      <span className="font-medium">{farmer.farmName}</span>
                      <span className="text-xs text-muted-foreground">({farmer.location.address})</span>
                    </div>
                  )}

                  <div className="border rounded-lg overflow-hidden px-5">
                    {farmerItems.map((item) => (
                      <CartItemComponent
                        key={item.id}
                        item={item}
                        onRemove={removeItem}
                        onUpdateQuantity={updateQuantity}
                      />
                    ))}

                    <div className="bg-muted/20 p-4">
                      <div className="flex justify-between mb-2">
                        <span>Subtotal ({farmerItems.length} items)</span>
                        <span className="font-medium">${subtotalByFarmer[farmerId].toFixed(2)}</span>
                      </div>

                      {farmer && (
                        <div className="flex flex-wrap gap-2 text-sm">
                          {farmerItems.some((item) => item.availableForDelivery) && (
                            <div className="flex items-center gap-1">
                              <Truck className="h-3 w-3" />
                              <span>Delivery Available</span>
                            </div>
                          )}

                          {farmerItems.some((item) => item.pickupAvailable) && (
                            <div className="flex items-center gap-1">
                              <Store className="h-3 w-3" />
                              <span>Pickup Available</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div>
            <CartSummary subtotal={subtotal} shipping={shipping} total={total} onCheckout={handleCheckout} />

            {isCheckingOut && (
              <div className="mt-4 p-4 bg-primary/10 rounded-lg flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                <span>Processing...</span>
              </div>
            )}

            <div className="mt-6 p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Escrow Protection</h3>
              <p className="text-sm text-muted-foreground">
                Revolutionary Farmers uses an escrow system to protect both buyers and sellers. Your payment will be
                held securely until you confirm receipt of your agricultural products.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

