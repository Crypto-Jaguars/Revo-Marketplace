"use client"

import Bounded from "@/components/Bounded"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useCartStore } from "@/store/cartStore/store"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const createBillingSchema = (t: (key: string) => string) =>
  z.object({
    firstName: z.string().min(1, t("form.errors.firstName")),
    companyName: z.string().optional(),
    streetAddress: z.string().min(1, t("form.errors.streetAddress")),
    apartment: z.string().optional(),
    town: z.string().min(1, t("form.errors.town")),
    phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, t("form.errors.phoneNumberFormat")),
    email: z.string().email(t("form.errors.email")),
    saveInfo: z.boolean().optional(),
  })

type BillingDetails = z.infer<ReturnType<typeof createBillingSchema>>

export default function CheckoutPage() {
  const t = useTranslations("Checkout")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderError, setOrderError] = useState<string | null>(null)
  const { Items, subtotal, shipping, total, clearCart, loading, error } = useCartStore()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillingDetails>({
    resolver: zodResolver(createBillingSchema(t)),
    defaultValues: {
      saveInfo: false,
    },
  })

  // If cart is empty, redirect to products page
  if (Items.length === 0 && !loading && !orderSuccess) {
    // Use setTimeout to avoid hydration issues
    setTimeout(() => {
      router.push("/products")
    }, 0)
    return (
      <Bounded>
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-medium mb-4">{t("emptyCart")}</h1>
          <p className="text-gray-500 mb-6">{t("redirecting")}</p>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Bounded>
    )
  }

  const onSubmit = async (data: BillingDetails) => {
    try {
      setIsSubmitting(true)
      setOrderError(null)

      // Simulate API call to process order
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Save billing info if requested
      if (data.saveInfo) {
        localStorage.setItem("billingInfo", JSON.stringify(data))
      }

      // Clear cart after successful order
      await clearCart()

      // Show success message
      setOrderSuccess(true)

      // Redirect to success page after a delay
      setTimeout(() => {
        router.push("/order-success")
      }, 3000)
    } catch (err) {
      console.error("Error processing order:", err)
      setOrderError(err instanceof Error ? err.message : "An error occurred while processing your order")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show success message
  if (orderSuccess) {
    return (
      <Bounded>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-medium mb-4">{t("orderSuccess")}</h1>
          <p className="text-gray-500 mb-6">{t("redirecting")}</p>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Bounded>
    )
  }

  return (
    <Bounded>
      <div className="w-full max-w-6xl px-4 xl:px-0">
        <div className="flex flex-wrap gap-2 text-sm mb-20">
          <span className="min-w-max text-black/50">Account</span>
          <span className="min-w-max text-black/50">/</span>
          <span className="min-w-max text-black/50">My Account</span>
          <span className="min-w-max text-black/50">/</span>
          <span className="min-w-max text-black/50">Product</span>
          <span className="min-w-max text-black/50">/</span>
          <span className="min-w-max text-black/50">View Cart</span>
          <span className="min-w-max text-black/50">/</span>
          <span>CheckOut</span>
        </div>

        {/* Display cart error if any */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Display order error if any */}
        {orderError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{orderError}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-10">
              <div className="flex flex-col w-full max-w-[470px]">
                <h1 className="text-[36px]/[30px] font-medium tracking-[4%]">{t("billingDetails")}</h1>
                <div className="space-y-8 mt-6 w-full">
                  <div className="space-y-2 w-full">
                    <label className="text-sm font-medium text-black">
                      {t("form.firstName")}
                      <span className="text-[#DB4444]/40">*</span>
                    </label>
                    <Input {...register("firstName")} className="w-full bg-[#F5F5F5] border rounded h-[50px]" />
                    {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
                  </div>

                  <div className="space-y-2 w-full">
                    <label className="text-sm font-medium text-black">{t("form.companyName")}</label>
                    <Input {...register("companyName")} className="w-full bg-[#F5F5F5] border rounded h-[50px]" />
                  </div>

                  <div className="space-y-2 w-full">
                    <label className="text-sm font-medium text-black">
                      {t("form.streetAddress")}
                      <span className="text-[#DB4444]/40">*</span>
                    </label>
                    <Input {...register("streetAddress")} className="w-full bg-[#F5F5F5] border rounded h-[50px]" />
                    {errors.streetAddress && <p className="text-red-500 text-xs">{errors.streetAddress.message}</p>}
                  </div>

                  <div className="space-y-2 w-full">
                    <label className="text-sm font-medium text-black">{t("form.apartment")}</label>
                    <Input {...register("apartment")} className="w-full bg-[#F5F5F5] border rounded h-[50px]" />
                  </div>

                  <div className="space-y-2 w-full">
                    <label className="text-sm font-medium text-black">
                      {t("form.town")}
                      <span className="text-[#DB4444]/40">*</span>
                    </label>
                    <Input {...register("town")} className="w-full bg-[#F5F5F5] border rounded h-[50px]" />
                    {errors.town && <p className="text-red-500 text-xs">{errors.town.message}</p>}
                  </div>

                  <div className="space-y-2 w-full">
                    <label className="text-sm font-medium text-black">
                      {t("form.phoneNumber")}
                      <span className="text-[#DB4444]/40">*</span>
                    </label>
                    <Input {...register("phoneNumber")} className="w-full bg-[#F5F5F5] border rounded h-[50px]" />
                    {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>}
                  </div>

                  <div className="space-y-2 w-full">
                    <label className="text-sm font-medium text-black">
                      {t("form.email")}
                      <span className="text-[#DB4444]/40">*</span>
                    </label>
                    <Input {...register("email")} className="w-full bg-[#F5F5F5] border rounded h-[50px]" />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="saveInfo" {...register("saveInfo")} />
                    <label
                      htmlFor="saveInfo"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t("saveInfo")}
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full max-w-[426px] mt-20">
                <div className="flex flex-col gap-8">
                  {Items.map((item) => {
                    // Calculate discounted price if discount exists
                    const discountMultiplier = item.discount ? (100 - item.discount) / 100 : 1
                    const discountedPrice = item.price.amount * discountMultiplier
                    const itemTotal = discountedPrice * item.quantity

                    return (
                      <div key={item.id} className="flex items-center justify-between pr-[60px]">
                        <div className="flex items-center gap-6">
                          <div className="relative h-[54px] w-[54px] overflow-hidden rounded">
                            <Image
                              src={
                                typeof item.images === "string"
                                  ? item.images.startsWith("http") || item.images.startsWith("/")
                                    ? item.images
                                    : `/images/${item.images}`
                                  : "/placeholder.svg"
                              }
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="54px"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="tracking-[0.32px]">{item.name}</span>
                            <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="tracking-[0.32px]">${itemTotal.toFixed(2)}</span>
                      </div>
                    )
                  })}
                  <div className="mt-8 flex flex-col gap-4">
                    <div className="w-full flex justify-between pb-4 border-b border-black/40">
                      <span className="tracking-[0.32px]">{t("subTotal")}</span>
                      <span className="tracking-[0.32px]">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="w-full flex justify-between pb-4 border-b border-black/40">
                      <span className="tracking-[0.32px]">{t("shipping")}</span>
                      <span className="tracking-[0.32px]">{shipping > 0 ? `$${shipping.toFixed(2)}` : t("free")}</span>
                    </div>
                    <div className="w-full flex justify-between pb-4">
                      <span className="tracking-[0.32px]">{t("total")}</span>
                      <span className="tracking-[0.32px]">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="mt-8">
                    <RadioGroup defaultValue="wallet2" className="gap-8">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="r1" />
                        <Label htmlFor="r1" className="text-base tracking-[0.32px]">
                          Stellar Wallet 1
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="wallet2" id="r2" />
                        <Label htmlFor="r2" className="text-base tracking-[0.32px]">
                          Stellar Wallet 2
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="">
                    <Image src={"/images/qr-code.png"} alt={"QR Code"} width={76} height={76} />
                  </div>
                  <div className="">
                    <Button
                      type="submit"
                      disabled={isSubmitting || Items.length === 0}
                      className="bg-[#375B42] hover:bg-[#245842] px-12 py-4 rounded-lg h-14 text-base font-medium"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t("processing")}
                        </>
                      ) : (
                        t("placeOrder")
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </Bounded>
  )
}

