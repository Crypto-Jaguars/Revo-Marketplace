// types.ts

export interface CartItem {
  quantity: number;
  id: number;
  name: string;
  price: {
    amount: number;
    unit: string;
  };
  images: string;
}

export interface RemoveButtonProps {
  itemId: number;
  itemName: string;
}

export interface UndoNotificationProps {
  itemId: number;
  itemName: string;
}

export interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}