'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ConfirmDialogProps } from './types';

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, onConfirm, onCancel }) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogTitle>Remove Item</DialogTitle>
        <DialogDescription>
          Are you sure you want to remove this item from your cart?
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
