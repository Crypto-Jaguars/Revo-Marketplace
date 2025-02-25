'use client';

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore/store";

const UndoNotification = () => {
  const { lastRemovedItems, undoRemove } = useCartStore();
  const [hasNotified, setHasNotified] = useState(false);

  useEffect(() => {
    if (lastRemovedItems && lastRemovedItems.length > 0 && !hasNotified) {
      toast(
        <div>
          <p>Removed {lastRemovedItems.length} item(s)</p>
          <Button variant="link" onClick={() => {
            undoRemove();
            toast.dismiss();
          }}>Undo</Button>
        </div>,
        {
          autoClose: 5000,
          closeButton: true,
          position: "bottom-left"
        }
      );
      setHasNotified(true); 
    }
  }, [lastRemovedItems, hasNotified]);


  useEffect(() => {
    if (lastRemovedItems.length === 0) {
      setHasNotified(false);
    }
  }, [lastRemovedItems]);

  return <ToastContainer />;
};

export default UndoNotification;
