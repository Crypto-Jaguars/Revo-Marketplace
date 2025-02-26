"use client"

import Bounded from "@/components/Bounded"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

export default function OrderSuccessPage() {
  const t = useTranslations("OrderSuccess")

  return (
    <Bounded>
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>

        <p className="text-gray-600 max-w-md mb-8">{t("message")}</p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8 w-full max-w-md">
          <h2 className="font-medium text-lg mb-4">{t("orderDetails")}</h2>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">{t("orderNumber")}:</span>
            <span className="font-medium">
              {Math.floor(Math.random() * 1000000)
                .toString()
                .padStart(6, "0")}
            </span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">{t("date")}:</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">{t("paymentMethod")}:</span>
            <span className="font-medium">Stellar Wallet</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="outline" className="min-w-[180px]">
            <Link href="/products">{t("continueShopping")}</Link>
          </Button>

          <Button asChild className="min-w-[180px] bg-[#375B42] hover:bg-[#245842]">
            <Link href="/en/account/orders">{t("viewOrder")}</Link>
          </Button>
        </div>
      </div>
    </Bounded>
  )
}

