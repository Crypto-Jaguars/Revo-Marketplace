'use client';

import ProductGallery from '@/components/products/ProductGallery';
import ProductInfo from '@/components/products/ProductInfo';
import RelatedProducts from '@/components/products/RelatedProducts';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { useTranslations } from 'next-intl';

const ProductPage = () => {
  const t = useTranslations('Products');

  const breadcrumbItems = [
    { label: t('breadcrumb.home'), href: '/' },
    { label: t('title'), href: '/products' },
    { label: t('productName'), href: '', isCurrent: true },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl font-sans" aria-label="Products">
      <Breadcrumb items={breadcrumbItems} />

      {/* Product Layout - Ajustado para mejor responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 xl:gap-12">
        <div className="w-full">
          <ProductGallery />
        </div>

        <div className="w-full">
          <ProductInfo />
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
