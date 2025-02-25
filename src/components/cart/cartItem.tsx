'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore/store";
import { useRouter } from 'next/navigation';
import { CartItem as CartItemType } from "./RemoveItem/types";
import UndoNotification from "./RemoveItem/UndoNotification";
import RemoveButton from "./RemoveItem/RemoveButton";

const CartItem = () => {
  const router = useRouter(); 
  const { 
    Items, 
    updateQuantity, 
    clearCart, 
    bulkRemove, 
    undoRemove, 
    lastRemovedItems, 
    syncStorage 
  } = useCartStore();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showUndo, setShowUndo] = useState(false);

  useEffect(() => {
    syncStorage();
  }, [syncStorage]);

  const handleQuantityChange = (id: number, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleBulkRemove = () => {
    bulkRemove(selectedItems);
    setSelectedItems([]);
    setShowUndo(true); 
  };

  useEffect(() => {
    if (Items.length === 0 && selectedItems.length > 0) {
      setShowUndo(true);
      setSelectedItems([]);
    }
  }, [Items, selectedItems]);

  useEffect(() => {
    if (showUndo) {
      const timer = setTimeout(() => setShowUndo(false), 5000); 
      return () => clearTimeout(timer);
    }
  }, [showUndo]);

  return (
    <div className="container mx-auto p-6">
      {showUndo && lastRemovedItems.length > 0 && (
        <UndoNotification 
          itemName={lastRemovedItems.length > 1 ? "multiple items" : lastRemovedItems[0]?.name} 
          onUndo={undoRemove} 
        />
      )}

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left p-4">
                <input 
                  type="checkbox" 
                  checked={selectedItems.length === Items.length}
                  onChange={() => {
                    if (selectedItems.length === Items.length) {
                      setSelectedItems([]);
                    } else {
                      setSelectedItems(Items.map(item => item.id));
                    }
                  }}
                />
              </th>
              <th className="text-left p-4 font-semibold text-gray-600">Products</th>
              <th className="text-left p-4 font-semibold text-gray-600">Price</th>
              <th className="text-left p-4 font-semibold text-gray-600">Quantity</th>
              <th className="text-left p-4 font-semibold text-gray-600">Subtotal</th>
              <th className="text-left p-4 font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {Items.length > 0 ? (
              Items.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <input 
                      type="checkbox" 
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                    />
                  </td>
                  <td className="flex items-center space-x-4 p-4">
                    <Image 
                      src={item.images} 
                      alt={`${item.name} image`}
                      className="rounded-md object-cover h-16 w-16 border border-gray-200"
                      width={64}
                      height={64}
                    />
                    <p className="text-lg font-medium text-gray-800">{item.name}</p>
                  </td>
                  <td className="p-4 text-lg text-gray-600">
                    <span className="font-semibold">{item.price.unit}</span>
                    {item.price.amount}
                  </td>
                  <td className="p-4">
                    <Select
                      defaultValue={item.quantity.toString()}
                      onValueChange={(value) => handleQuantityChange(item.id, parseInt(value))}
                    >
                      <SelectTrigger className="w-20 border border-gray-300 rounded-md">
                        <SelectValue placeholder="Qty" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(10)].map((_, i) => (
                          <SelectItem key={i} value={(i + 1).toString()}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-4 text-lg text-gray-600">
                    {item.price.unit}{item.price.amount * item.quantity}
                  </td>
                  <td className="p-4">
                    <RemoveButton itemId={item.id} itemName={item.name} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">
                  Your cart is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6 space-x-4">
        <Button 
          variant="outline" 
          className="px-6 py-3 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          onClick={() => router.push('/shop')}
        >
          Return to shop
        </Button>
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            className="px-6 py-3 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            onClick={() => clearCart()}
          >
            Update Cart
          </Button>
          <Button 
            variant="destructive" 
            className="px-6 py-3 text-white bg-red-600 rounded-md hover:bg-red-700 transition"
            onClick={handleBulkRemove}
            disabled={selectedItems.length === 0}
          >
            Remove Selected
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
