'use client';

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore/store";
import { toast } from 'react-toastify';

const CartSummary = () => {
  const { subtotal, shipping, total, loading, setLoading, calculateSummary } = useCartStore();



  const handleCheckout = async () => {
    setLoading(true);
    try {

      console.log("Redirecting to checkout...");
    } catch (error) {
      console.error("Checkout failed:", error);

      toast.error("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  React.useEffect(() => {
    calculateSummary();
  }, [calculateSummary]);

  return (
    <Card className='border-4 border-black'>
      <CardHeader>
        <h2 className="text-lg font-bold">Cart Summary</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping:</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-[#375B42]"onClick={handleCheckout} disabled={loading || total === 0}>{loading ? 'Processing...' : 'Proceed to Checkout'}</Button>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;



