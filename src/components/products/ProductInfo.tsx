"use client"

import { useState } from "react"
import { Rating } from "../ui/rating"
import { HeartIcon, UpdateIcon } from "@radix-ui/react-icons"
import { TruckIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { AddToCartButton } from "./AddToCartButton"
import type { Product } from "@/types/product"
import { calculateDiscountedPrice } from "@/constants/helpers/CalculateDiscountedPrice"

interface ProductInfoProps {
  product: Product
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const t = useTranslations("Products")
  const [quantity, setQuantity] = useState(1)
  const [isWishlist, setIsWishlist] = useState(false)
  const [isHover, setIsHover] = useState(false)

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price.amount)

  const formattedDiscountedPrice = product.discount
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(calculateDiscountedPrice(product.price.amount, product.discount))
    : formattedPrice

  return (
    <div className="space-y-4">
      {/* Title */}
      <h1 className="text-2xl font-medium text-black">{product.name}</h1>

      {/* Rating and Stock Status */}
      <div className="flex items-center gap-3 text-sm">
        <div className="flex items-center gap-2">
          <Rating
            value={product.rating as number & { __brand: "ValidRating" }}
            max={5}
            readOnly
            aria-label={t("rating.aria")}
          />
          <span className="text-gray-500">{t("rating.reviews", { count: 150 })}</span>
        </div>
        <span className="text-gray-300">|</span>
        <span className="text-gray-500">{product.stockQuantity > 0 ? t("stock.inStock") : t("stock.outOfStock")}</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-medium text-black">{formattedDiscountedPrice}</span>
        {product.discount > 0 && <span className="text-lg line-through text-gray-400">{formattedPrice}</span>}
      </div>

      {/* Description */}
      <div className="border-b border-gray-200">
        <p className="text-gray-500 text-sm leading-relaxed pb-4">{product.description}</p>
      </div>

      {/* Quantity and Actions */}
      <div className="flex items-center gap-3 mt-8">
        {/* Quantity Selector */}
        <div className="flex items-center">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className={`
              w-10 h-10 flex items-center justify-center border border-r-0 border-gray-300 rounded-l hover:bg-gray-50
              ${quantity === 1 ? "opacity-50 cursor-not-allowed" : ""}
            `}
            disabled={quantity === 1}
          >
            −
          </button>

          <input
            type="text"
            value={quantity}
            onChange={(e) => {
              const val = Number.parseInt(e.target.value)
              if (!isNaN(val)) {
                setQuantity(Math.max(1, Math.min(val, product.stockQuantity)))
              }
            }}
            className="w-12 h-10 border border-gray-300 text-center [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
            className={`
              w-10 h-10 flex items-center justify-center border border-l-0 border-gray-300 rounded-r hover:bg-gray-50
            `}
            disabled={quantity >= product.stockQuantity}
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <AddToCartButton
          product={product}
          quantity={quantity}
          className="flex-1 h-10 bg-[#375B42] text-white-dark rounded hover:bg-[#375B42]/90 transition-colors"
          showIcon={false}
        />

        {/* Wishlist Button */}
        <button
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={() => setIsWishlist(!isWishlist)}
          className={`
            w-10 h-10 flex items-center justify-center rounded
            transition-all duration-300
            ${
              isWishlist
                ? "bg-[#375B42] border-[#375B42] hover:bg-white hover:border-[#375B42] border"
                : "bg-white border-gray-300 hover:bg-[#375B42] hover:border-[#375B42] border"
            }
          `}
        >
          <HeartIcon
            className={`
              w-5 h-5 transition-colors duration-300
              ${
                isWishlist
                  ? isHover
                    ? "text-[#375B42]" // Wishlist activo + hover
                    : "text-white-dark" // Wishlist activo sin hover
                  : isHover
                    ? "text-white-dark" // No activo + hover
                    : "text-[#000000]" // No activo sin hover
              }
            `}
          />
        </button>
      </div>

      {/* Delivery Info */}
      <div className="mt-8 space-y-4">
        {/* Free Delivery */}
        <div className="flex gap-4 items-center border border-gray-200 rounded-lg p-4">
          <TruckIcon className="w-11 h-11" />
          <div>
            <h3 className="font-medium text-black">{t("delivery.free")}</h3>
            <button className="text-black text-left underline hover:no-underline text-xs">
              {t("delivery.checkPostalCode")}
            </button>
          </div>
        </div>

        {/* Return Delivery */}
        <div className="flex gap-4 items-center border border-gray-200 rounded-lg p-4">
          <UpdateIcon className="w-11 h-11" />
          <div>
            <h3 className="font-medium text-black">{t("returns.title")}</h3>
            <div className="text-sm">
              <span className="text-gray-500">{t("returns.description")} </span>

              <button className="text-black underline hover:no-underline text-xs">{t("returns.details")}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo

