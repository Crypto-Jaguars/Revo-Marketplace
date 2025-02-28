'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useCartStore } from "@/store/cartStore/store";
import ConfirmDialog from "@/components/cart/RemoveItem/ConfirmDialog";

interface RemoveButtonProps {
  itemId: number;
  itemName: string;
}

const RemoveButton = ({ itemId, itemName }: RemoveButtonProps) => {
  const { removeItem } = useCartStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const handleRemove = async () => {
    try {
      await removeItem(itemId);
      setIsDialogOpen(false);
    } catch (err) {
      setError("Error removing item");
    }
  };

  return (
    <>
      <Button 
        variant="destructive" 
        className="flex items-center space-x-2 hover:bg-red-600 transition"
        onClick={() => setIsDialogOpen(true)}
      >
        <Trash className="w-4 h-4" />
        <span>Remove</span>
      </Button>

      <ConfirmDialog 
        open={isDialogOpen}
        onConfirm={handleRemove}
        onCancel={() => setIsDialogOpen(false)}
      />

      {error && <p className="text-red-600">{error}</p>}
    </>
  );
};

export default RemoveButton;
