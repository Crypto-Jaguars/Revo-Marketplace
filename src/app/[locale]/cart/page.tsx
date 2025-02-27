'use client';

import { Card, CardContent } from "@/components/ui/card";
import CartItem from "@/components/cart/cartItem";
import CartSummary from "@/components/cart/cartSummary";

const CartPage = () => {
  const handleCheckout = () => {
    console.log("Proceeding to checkout");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <div className="lg:col-span-2">
          <CartItem />
        </div>

        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
