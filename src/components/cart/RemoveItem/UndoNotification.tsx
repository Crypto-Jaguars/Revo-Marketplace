import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';

interface UndoNotificationProps {
  itemName: string;
  onUndo: () => void;
}

const UndoNotification: React.FC<UndoNotificationProps> = ({ itemName, onUndo }) => {
  React.useEffect(() => {
    const notify = () => {
      toast(
        <div>
          <p>Removed {itemName}</p>
          <Button
            variant="link"
            onClick={() => {
              onUndo();
              toast.dismiss();
            }}
          >
            Undo
          </Button>
        </div>,
        {
          autoClose: 15000,
          closeButton: true,
          position: 'bottom-left',
        }
      );
    };

    notify();
  }, [itemName, onUndo]);

  return <ToastContainer />;
};

export default UndoNotification;
