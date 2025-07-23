'use client';

import ProductGallery from '@/components/products/ProductGallery';
import ProductInfo from '@/components/products/ProductInfo';
import RelatedProducts from '@/components/products/RelatedProducts';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { productsMock } from '@/mocks/products';
import { Product } from '@/types/product';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProductData {
  price: number;
  description: string;
  rating: number;
  reviews: number;
}

// TODO(#56): Replace with actual data fetching from API
const mockProductData: ProductData = {
  price: 299.99,
  description: 'High-quality product with premium features',
  rating: 4.5,
  reviews: 128,
};

const ProductPage = () => {
  const t = useTranslations('Products');
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Find product by ID
        const foundProduct = productsMock.find((p) => p.id === params.id);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const breadcrumbItems = [
    { label: t('breadcrumb.home'), href: '/' },
    { label: t('title'), href: '/products' },
    { label: product?.name || t('productName'), href: '', isCurrent: true },
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl font-sans">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 xl:gap-12">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl font-sans">
        <Breadcrumb items={breadcrumbItems} />
        <div className="text-center py-16">
          <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
          <p className="text-gray-500">
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl font-sans" aria-label="Products">
      <Breadcrumb items={breadcrumbItems} />

      {/* Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 xl:gap-12">
        <div className="w-full">
          <ProductGallery images={product.images.map((img) => `/images/${img}`)} />
        </div>

        <div className="w-full">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12 lg:mt-16 mb-16 lg:mb-32">
        <RelatedProducts />
      </div>
    </div>
  );
};

export default ProductPage;
