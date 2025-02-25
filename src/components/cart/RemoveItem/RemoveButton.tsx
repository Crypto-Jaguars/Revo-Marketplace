'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useCartStore } from "@/store/cartStore/store";

interface RemoveButtonProps {
  itemId: number;
  itemName: string;
}

const RemoveButton = ({ itemId, itemName }: RemoveButtonProps) => {
  const { removeItem } = useCartStore();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRemove = () => {
    removeItem(itemId);
    setShowConfirm(false);
  };

  return (
    <>
      <Button 
        variant="destructive" 
        className="flex items-center space-x-2 hover:bg-red-600 transition"
        onClick={() => setShowConfirm(true)}
      >
        <Trash className="w-4 h-4" />
        <span>Remove</span>
      </Button>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg w-80">
            <h3 className="text-lg font-bold">Remove {itemName}?</h3>
            <p>Are you sure you want to remove this item from your cart?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleRemove}>Remove</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RemoveButton;
