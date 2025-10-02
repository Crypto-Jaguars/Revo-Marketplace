'use client';

import { useState, useEffect } from 'react';
import { useCartStore, useLanguageStore } from '@/store';
import CartItemComponent from './cartItem';
import CartSummary from './cartSummary';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, Truck, Store, Undo2, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function CartPage() {
  const t = useTranslations('CartPage');
  const { language } = useLanguageStore();

  const {
    Items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    shipping,
    total,
    loading,
    error,
    bulkRemove,
    undoRemove,
    lastRemovedItems,
    resetCart,
  } = useCartStore();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Reset selected items when cart items change
  useEffect(() => {
    setSelectedItems([]);
  }, []);

  // Toggle item selection for bulk actions
  const toggleItemSelection = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // Select all items
  const selectAllItems = () => {
    if (selectedItems.length === Items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(Items.map((item) => item.id));
    }
  };

  // Handle bulk remove
  const handleBulkRemove = async () => {
    if (selectedItems.length > 0) {
      await bulkRemove(selectedItems);
      setSelectedItems([]);
    }
  };

  // Group items by farmer
  const itemsByFarmer = Items.reduce(
    (acc, item) => {
      if (item.farmer) {
        const farmerId = item.farmer.id;
        if (!acc[farmerId]) {
          acc[farmerId] = [];
        }
        acc[farmerId].push(item);
      } else {
        // For items without farmer info, group under "other"
        if (!acc['other']) {
          acc['other'] = [];
        }
        acc['other'].push(item);
      }
      return acc;
    },
    {} as Record<string, typeof Items>
  );

  // Calculate subtotal by farmer
  const subtotalByFarmer = Object.entries(itemsByFarmer).reduce(
    (acc, [farmerId, items]) => {
      acc[farmerId] = items.reduce((total, item) => {
        const discountMultiplier = item.discount ? (100 - item.discount) / 100 : 1;
        return total + item.price.amount * discountMultiplier * item.quantity;
      }, 0);
      return acc;
    },
    {} as Record<string, number>
  );

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      // Navigate to checkout or show success
      alert('Proceeding to checkout!');
    }, 1500);
  };

  if (Items.length === 0 && lastRemovedItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-8">{t('title')}</h1>
        <div className="bg-muted/30 rounded-lg p-12 text-center">
          <h2 className="text-xl font-medium mb-4">{t('emptyCart.title')}</h2>
          <p className="text-muted-foreground mb-6">{t('emptyCart.description')}</p>
          <Link href={`/${language}/products`}>
            <Button className="bg-[#375B42] dark:bg-background-dark hover:bg-[#375B42] dark:hover:bg-[#2C4733]">
              {t('emptyCart.browseProducts')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (Items.length === 0 && lastRemovedItems.length > 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-8">{t('title')}</h1>
        <div className="bg-muted/30 rounded-lg p-12 text-center">
          <h2 className="text-xl font-medium mb-4">{t('emptyAfterRemoval.title')}</h2>
          <p className="text-muted-foreground mb-6">{t('emptyAfterRemoval.description')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={undoRemove} className="flex items-center gap-2">
              <Undo2 className="h-4 w-4" />
              {t('emptyAfterRemoval.restoreItems')}
            </Button>

            <Link href={`/${language}/products`}>
              <Button className="bg-[#375B42] dark:bg-background-dark hover:bg-[#375B42] dark:hover:bg-[#2C4733]">
                {t('emptyAfterRemoval.browseProducts')}
              </Button>
            </Link>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-8">{t('title')}</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {lastRemovedItems.length > 0 && (
        <Alert className="mb-6 bg-muted/30 border-muted">
          <div className="flex justify-between items-center w-full">
            <AlertDescription>
              {lastRemovedItems.length}{' '}
              {lastRemovedItems.length === 1 ? t('removedItems.item') : t('removedItems.items')}{' '}
              {t('removedItems.removedFromCart')}
            </AlertDescription>
            <Button
              variant="outline"
              size="sm"
              onClick={undoRemove}
              className="flex items-center gap-1"
            >
              <Undo2 className="h-3 w-3" />
              {t('removedItems.undo')}
            </Button>
          </div>
        </Alert>
      )}

      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!loading && Items.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-medium">
                  {Items.length} {Items.length === 1 ? t('items.item') : t('items.items')}
                </h2>
                {Items.length > 1 && (
                  <Button variant="outline" size="sm" onClick={selectAllItems} className="text-xs">
                    {selectedItems.length === Items.length
                      ? t('items.deselectAll')
                      : t('items.selectAll')}
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                {selectedItems.length > 0 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleBulkRemove}
                    className="flex items-center gap-1"
                  >
                    <Trash2 className="h-3 w-3" />
                    {t('items.removeSelected')}
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={resetCart}>
                  {t('items.resetCart')}
                </Button>
                <Button variant="outline" size="sm" onClick={clearCart}>
                  {t('items.clearCart')}
                </Button>
              </div>
            </div>

            {/* Group items by farmer */}
            {Object.entries(itemsByFarmer).map(([farmerId, farmerItems]) => {
              // Skip rendering if no items
              if (farmerItems.length === 0) return null;

              // Get farmer info from first item if available
              const farmer = farmerItems[0].farmer;

              return (
                <div key={farmerId} className="mb-8">
                  {farmer && (
                    <div className="flex items-center gap-2 mb-4 p-2 bg-muted/30 rounded">
                      <span className="font-medium">{farmer.farmName}</span>
                      <span className="text-xs text-muted-foreground">
                        ({farmer.location.address})
                      </span>
                    </div>
                  )}

                  <div className="border rounded-lg overflow-hidden px-5">
                    {farmerItems.map((item) => (
                      <CartItemComponent
                        key={item.id}
                        item={item}
                        onRemove={removeItem}
                        onUpdateQuantity={updateQuantity}
                        onBulkRemove={bulkRemove}
                        onUndoRemove={undoRemove}
                        hasRemovedItems={lastRemovedItems.length > 0}
                        onResetCart={resetCart}
                        selectedItems={selectedItems}
                        onToggleSelect={toggleItemSelection}
                      />
                    ))}

                    <div className="bg-muted/20 p-4">
                      <div className="flex justify-between mb-2">
                        <span>
                          {t('farmer.subtotal')} ({farmerItems.length} {t('farmer.items')})
                        </span>
                        <span className="font-medium">
                          ${subtotalByFarmer[farmerId].toFixed(2)}
                        </span>
                      </div>

                      {farmer && (
                        <div className="flex flex-wrap gap-2 text-sm">
                          {farmerItems.some((item) => item.availableForDelivery) && (
                            <div className="flex items-center gap-1">
                              <Truck className="h-3 w-3" />
                              <span>{t('farmer.deliveryAvailable')}</span>
                            </div>
                          )}

                          {farmerItems.some((item) => item.pickupAvailable) && (
                            <div className="flex items-center gap-1">
                              <Store className="h-3 w-3" />
                              <span>{t('farmer.pickupAvailable')}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              onCheckout={handleCheckout}
            />

            {isCheckingOut && (
              <div className="mt-4 p-4 bg-primary/10 rounded-lg flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                <span>{t('checkout.processing')}</span>
              </div>
            )}

            <div className="mt-6 p-4 border rounded-lg">
              <h3 className="font-medium mb-2">{t('escrowProtection.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('escrowProtection.description')}</p>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
