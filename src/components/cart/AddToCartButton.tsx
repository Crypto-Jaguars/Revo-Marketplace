"use client"

import { useState } from "react"
import { ShoppingCart, Check, Loader2 } from "lucide-react"
import { useCartStore } from "@/store/cartStore/store"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"
import { cn } from "@/lib/utils"

interface AddToCartButtonProps {
    product: Product
    quantity?: number
    className?: string
    variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
    size?: "default" | "sm" | "lg" | "icon"
    showIcon?: boolean
    fullWidth?: boolean
}

export function AddToCartButton({
    product,
    quantity = 1,
    className,
    variant = "default",
    size = "default",
    showIcon = true,
    fullWidth = false,
}: AddToCartButtonProps) {
    const { addItem, Items, loading } = useCartStore()
    const [isAdded, setIsAdded] = useState(false)

    const isInCart = Items.some((item) => item.id === Number(product.id))

    const handleAddToCart = async () => {
        try {
            await addItem({
                id: Number(product.id),
                name: product.name,
                description: product.description,
                price: product.price,
                discount: product.discount,
                images: product.images[0],
                quantity: quantity,
                stockQuantity: product.stockQuantity,
                farmer: product.farmer,
                category: product.category,
                subCategory: product.subCategory || "",
                certifications: product.certifications,
                farmingMethod: product.farmingMethod,
                availableForDelivery: product.availableForDelivery,
                pickupAvailable: product.pickupAvailable,
                rating: product.rating,
            })

            setIsAdded(true)
            setTimeout(() => setIsAdded(false), 2000)
        } catch (err) {
            console.error("Failed to add item to cart", err)
        }
    }

    return (
        <Button
            variant={variant}
            size={size}
            style={{ color: "white" }}
            className={cn(fullWidth && "w-full", isAdded && "bg-green-600 hover:bg-green-700", className)}
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleAddToCart()
            }}
            disabled={loading || isAdded}
        >
            {loading ? (
                <>
                    <Loader2 className={cn("h-4 w-4 animate-spin", showIcon && "mr-2")} />
                    <span>Adding...</span>
                </>
            ) : isAdded ? (
                <>
                    <Check className={cn("h-4 w-4", showIcon && "mr-2")} />
                    <span>Added</span>
                </>
            ) : (
                <>
                    {showIcon && <ShoppingCart className="h-4 w-4 mr-2" />}
                    <span>{isInCart ? "Add Again" : "Add to Cart"}</span>
                </>
            )}
        </Button>
    )
}

