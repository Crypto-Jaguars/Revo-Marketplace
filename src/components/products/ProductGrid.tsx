'use client';

import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { useInView } from 'react-intersection-observer';
import { useEffect, useCallback, memo, useMemo } from 'react';
import { ProductSkeleton } from './ProductSkeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { ArrowLeft } from '../icons/ArrowLeft';
import { ArrowRight } from '../icons/ArrowRight';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  onProductClick: (productId: string) => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoading?: boolean;
  isFilterLoading?: boolean;
  error?: Error | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProductGrid = memo<ProductGridProps>(function ProductGrid({
  products,
  viewMode,
  onProductClick,
  hasMore = false,
  onLoadMore,
  isLoading = false,
  isFilterLoading = false,
  error = null,
  currentPage,
  totalPages,
  onPageChange,
}) {
  const t = useTranslations('Products');
  const pathname = usePathname();

  const { ref, inView } = useInView({
    threshold: 0.5,
    delay: 100,
  });

  const handleInView = useCallback(() => {
    if (inView && hasMore && onLoadMore && !isLoading && !isFilterLoading) {
      onLoadMore();
    }
  }, [inView, hasMore, onLoadMore, isLoading, isFilterLoading]);

  useEffect(() => {
    handleInView();
  }, [handleInView]);

  const gridClassName = useMemo(() =>
    viewMode === 'grid'
      ? cn(
          'grid gap-8',
          'grid-cols-1',
          'sm:grid-cols-2',
          'lg:grid-cols-3',
          'justify-items-center',
          isFilterLoading ? 'opacity-50' : ''
        )
      : 'flex flex-col gap-4',
    [viewMode, isFilterLoading]
  );

  const renderPagination = useCallback(() => {
    const pages = [];
    const maxVisiblePages = 5;

    // Siempre mostrar la primera página
    pages.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={cn(
          'w-8 h-8 flex items-center justify-center rounded',
          currentPage === 1 ? 'text-black bg-black/10' : 'text-gray-500'
        )}
      >
        1
      </button>
    );

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) {
      pages.push(<span key="start-ellipsis">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={cn(
            'w-8 h-8 flex items-center justify-center rounded',
            currentPage === i ? 'text-black bg-black/10' : 'text-gray-500'
          )}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      pages.push(<span key="end-ellipsis">...</span>);
    }

    // Siempre mostrar la última página si hay más de una página
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={cn(
            'w-8 h-8 flex items-center justify-center rounded',
            currentPage === totalPages ? 'text-black bg-black/10' : 'text-gray-500'
          )}
        >
          {totalPages}
        </button>
      );
    }

    return (
      <nav className="flex items-center justify-between gap-2 mt-8" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className={cn(
            'flex items-center justify-between gap-2 p-2 rounded-[8px] w-[120px]',
            currentPage === 1
              ? 'text-gray-300 border border-gray-300 cursor-not-allowed'
              : 'text-gray-500 border border-black/10 hover:text-black hover:border hover:border-black'
          )}
        >
          <ArrowLeft
            className={cn('w-5 h-5', currentPage === 1 ? 'stroke-gray-300 ' : 'stroke-gray-500')}
          />
          {t('pagination.previous')}
        </button>

        <div className="flex items-center gap-2" role="list">
          {pages}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className={cn(
            'flex items-center justify-between gap-2 p-2 rounded-[8px] w-[120px]',
            currentPage === totalPages
              ? 'text-gray-300 border border-gray-300 cursor-not-allowed'
              : 'text-gray-500 border border-black/10 hover:text-black hover:border hover:border-black'
          )}
        >
          {t('pagination.next')}
          <ArrowRight
            className={cn(
              'w-5 h-5',
              currentPage === totalPages ? 'stroke-gray-300 ' : 'stroke-gray-500'
            )}
          />
        </button>
      </nav>
    );
  }, [currentPage, totalPages, onPageChange, t]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error.message || 'An error occurred while loading products'}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-[1440px] w-[56vw] mx-auto">
        <div className={gridClassName} aria-busy="true" role="grid" aria-label="Loading products">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="h-[calc(100vh-300px)] flex flex-col items-center justify-center bg-white rounded-lg p-8">
        <div className="max-w-md text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('empty.title')}</h3>
          <p className="text-gray-500 mb-6">{t('empty.description')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto" role="region" aria-label="Products grid">
      <div
        className={cn(
          'grid gap-8',
          'grid-cols-1',
          'sm:grid-cols-2',
          'lg:grid-cols-3',
          'justify-items-center',
          isFilterLoading ? 'opacity-50' : ''
        )}
        role={viewMode === 'grid' ? 'grid' : 'list'}
        aria-busy={isFilterLoading}
      >
        {products.map((product, index) => (
          <Link href={`${pathname}/${product.id}`} key={product.id}>
            <ProductCard
              product={product}
              viewMode={viewMode}
              onClick={onProductClick}
              aria-setsize={products.length}
              aria-posinset={index + 1}
            />
          </Link>
        ))}
      </div>

      {renderPagination()}

      {hasMore && (
        <div ref={ref} className="w-full flex justify-center" aria-hidden="true">
          <ProductSkeleton />
        </div>
      )}
    </div>
  );
});

export { ProductGrid };

export const ProductGridTable = memo<{ children: React.ReactNode }>(function ProductGridTable({ children }) {
  return (
    <div
      className={cn(
        'grid gap-4 w-full',
        'grid-cols-1',
        'sm:grid-cols-2',
        'md:grid-cols-3',
        'lg:grid-cols-4',
        'xl:grid-cols-5'
      )}
    >
      {children}
    </div>
  );
});

ProductGridTable.displayName = 'ProductGridTable';
