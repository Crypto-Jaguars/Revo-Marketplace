'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Bounded from '@/components/Bounded';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  farmName: string;
  rating: number;
  inStock: boolean;
  discount?: number;
}

export default function WishlistPage() {
  const t = useTranslations('Wishlist');
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading wishlist items
    const loadWishlist = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - in real app, this would come from API or local storage
      const mockWishlist: WishlistItem[] = [
        {
          id: '1',
          name: 'Organic Tomatoes',
          price: 4.99,
          image: '/images/tomatoes.jpg',
          category: 'Vegetables',
          farmName: 'Green Valley Farm',
          rating: 4.8,
          inStock: true,
          discount: 15
        },
        {
          id: '2',
          name: 'Fresh Eggs',
          price: 6.50,
          image: '/images/eggs.jpg',
          category: 'Dairy & Eggs',
          farmName: 'Sunrise Poultry',
          rating: 4.9,
          inStock: true
        },
        {
          id: '3',
          name: 'Organic Lettuce',
          price: 3.25,
          image: '/images/placeholder.jpg',
          category: 'Vegetables',
          farmName: 'Organic Harvest',
          rating: 4.6,
          inStock: false
        }
      ];
      
      setWishlistItems(mockWishlist);
      setIsLoading(false);
    };

    loadWishlist();
  }, []);

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    toast.success('Item removed from wishlist');
  };

  const addToCart = (item: WishlistItem) => {
    if (!item.inStock) {
      toast.error('This item is currently out of stock');
      return;
    }
    
    // In real app, this would add to cart store
    toast.success(`${item.name} added to cart`);
  };

  const goToProduct = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  const calculateDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return price * (1 - discount / 100);
  };

  if (isLoading) {
    return (
      <Bounded>
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-gray-300">Loading your wishlist...</p>
          </div>
        </div>
      </Bounded>
    );
  }

  return (
    <Bounded>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">My Wishlist</h1>
          <p className="text-gray-300">
            {wishlistItems.length > 0 
              ? `You have ${wishlistItems.length} item${wishlistItems.length === 1 ? '' : 's'} in your wishlist`
              : 'Your wishlist is empty'
            }
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">Your wishlist is empty</h2>
              <p className="text-gray-300 mb-6">
                Start adding products to your wishlist to save them for later
              </p>
              <Button 
                onClick={() => router.push('/marketplace')}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                Browse Products
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="bg-white/10 backdrop-blur-sm border-white/20 group hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover rounded-lg cursor-pointer"
                      onClick={() => goToProduct(item.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/20 hover:bg-white/30 text-white"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    {item.discount && (
                      <Badge className="absolute top-2 left-2 bg-red-600 text-white">
                        -{item.discount}%
                      </Badge>
                    )}
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                        <Badge variant="destructive" className="text-white">
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-gray-300 border-gray-400">
                        {item.category}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-300">{item.rating}</span>
                      </div>
                    </div>

                    <h3 
                      className="text-lg font-semibold text-white cursor-pointer hover:text-green-400 transition-colors"
                      onClick={() => goToProduct(item.id)}
                    >
                      {item.name}
                    </h3>

                    <p className="text-gray-300 text-sm">by {item.farmName}</p>

                    <div className="flex items-center space-x-2">
                      {item.discount ? (
                        <>
                          <span className="text-lg font-bold text-green-400">
                            ${calculateDiscountedPrice(item.price, item.discount).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            ${item.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-green-400">
                          ${item.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button
                        onClick={() => addToCart(item)}
                        disabled={!item.inStock}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-600 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => goToProduct(item.id)}
                        className="border-white text-white hover:bg-white/10"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {wishlistItems.length > 0 && (
          <div className="mt-8 text-center">
            <Button 
              onClick={() => router.push('/marketplace')}
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </Bounded>
  );
}