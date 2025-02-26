"use client"

import Image from "next/image"
import { Minus, Plus, Trash2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { CartItem } from "@/store/cartStore/types"

interface CartItemProps {
  item: CartItem
  onRemove: (id: number) => Promise<void>
  onUpdateQuantity: (id: number, quantity: number) => Promise<void>
  onSaveForLater?: (id: number) => void
}

export default function CartItemComponent({ item, onRemove, onUpdateQuantity, onSaveForLater }: CartItemProps) {
  const handleIncrement = async () => {
    if (!item.stockQuantity || item.quantity < item.stockQuantity) {
      await onUpdateQuantity(item.id, item.quantity + 1)
    }
  }

  const handleDecrement = async () => {
    if (item.quantity > 1) {
      await onUpdateQuantity(item.id, item.quantity - 1)
    }
  }

  // Calculate discounted price if discount exists
  const discountMultiplier = item.discount ? (100 - item.discount) / 100 : 1
  const discountedPrice = item.price.amount * discountMultiplier
  const itemTotal = discountedPrice * item.quantity

  // Handle image source
  const imageSrc = (() => {
    if (typeof item.images === "string") {
      // If it's a string, ensure it has a leading slash or is an absolute URL
      if (item.images.startsWith("http") || item.images.startsWith("/")) {
        return item.images
      } else {
        // Add leading slash to relative paths
        return `/images/${item.images}`
      }
    } else if (Array.isArray(item.images) && item.images.length > 0) {
      // If it's an array, ensure the first item has a leading slash or is an absolute URL
      const firstImage = item.images[0]
      if (firstImage.startsWith("http") || firstImage.startsWith("/")) {
        return firstImage
      } else {
        // Add leading slash to relative paths
        return `/images/${firstImage}`
      }
    }
    // Default fallback
    return "/placeholder.svg"
  })()

  return (
    <div className="flex items-start gap-4 py-4 border-b">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
        <Image src={imageSrc || "/placeholder.svg"} alt={item.name} fill className="object-cover" sizes="80px" />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-sm font-medium">{item.name}</h3>
            {item.description && <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{item.description}</p>}
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">
              {item.price.unit.startsWith("$") ? "" : "$"}
              {itemTotal.toFixed(2)}
            </p>
            {item.discount && item.discount > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-xs line-through text-muted-foreground">
                  ${(item.price.amount * item.quantity).toFixed(2)}
                </span>
                <Badge variant="destructive" className="text-[10px] h-4">
                  -{item.discount}%
                </Badge>
              </div>
            )}
          </div>
        </div>

        {item.farmer && (
          <div className="mt-1 flex items-center text-xs text-muted-foreground">
            <span>Seller: </span>
            <div className="flex items-center ml-1">
              <span>{item.farmer.farmName}</span>
            </div>
          </div>
        )}

        {item.certifications && item.certifications.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {item.certifications.map((cert) => (
              <Badge key={cert} variant="outline" className="text-[10px] h-4">
                {cert}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={handleIncrement}
              disabled={item.stockQuantity ? item.quantity >= item.stockQuantity : false}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>

          <div className="flex gap-2">
            {onSaveForLater && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onSaveForLater(item.id)}>
                <Heart className="h-4 w-4" />
                <span className="sr-only">Save for later</span>
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => onRemove(item.id)}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove item</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

