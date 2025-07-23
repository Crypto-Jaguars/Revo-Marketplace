'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { ProductGrid } from '@/components/products/ProductGrid';
import { productsMock } from '@/mocks/products';
import Bounded from '@/components/Bounded';
import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductFilters } from '@/components/products/ProductFilters';
import { calculateDiscountedPrice } from '@/constants/helpers/CalculateDiscountedPrice';
import { useSearchStore } from '@/store/searchStore';

export default function ProductsPage() {
  const t = useTranslations('Products');
  const { searchTerm } = useSearchStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'price' | 'date' | 'stock'>('date');
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const priceRange = useMemo(() => {
    const prices = productsMock.map((p) => p.price.amount);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, []);

  const [filters, setFilters] = useState<ProductFilters>({
    search: searchTerm,
    category: '',
    farmingMethod: '',
    deliveryOnly: false,
    pickupOnly: false,
    priceRange: [priceRange.min, priceRange.max],
  });

  // Update search term in filters when it changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: searchTerm,
    }));
  }, [searchTerm]);

  const handleProductClick = useCallback((productId: string) => {
    console.log('Product clicked:', productId);
  }, []);

  const filteredProducts = useMemo(() => {
    return productsMock.filter((product) => {
      const searchMatch =
        !filters.search || product.name.toLowerCase().includes(filters.search.toLowerCase());

      const categoryMatch = !filters.category || product.category === filters.category;

      const methodMatch = !filters.farmingMethod || product.farmingMethod === filters.farmingMethod;

      const deliveryMatch = !filters.deliveryOnly || product.availableForDelivery;

      const pickupMatch = !filters.pickupOnly || product.pickupAvailable;

      const priceMatch =
        !filters.priceRange ||
        (calculateDiscountedPrice(product.price.amount, product.discount) >=
          filters.priceRange[0] &&
          calculateDiscountedPrice(product.price.amount, product.discount) <=
            filters.priceRange[1]);

      return (
        searchMatch && categoryMatch && methodMatch && deliveryMatch && pickupMatch && priceMatch
      );
    });
  }, [filters]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return (
            calculateDiscountedPrice(a.price.amount, a.discount) -
            calculateDiscountedPrice(b.price.amount, b.discount)
          );
        case 'date':
          return b.harvestDate.getTime() - a.harvestDate.getTime();
        case 'stock':
          return b.stockQuantity - a.stockQuantity;
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const categories = useMemo(() => Array.from(new Set(productsMock.map((p) => p.category))), []);

  const farmingMethods = useMemo(
    () => Array.from(new Set(productsMock.map((p) => p.farmingMethod))),
    []
  );

  const handleFilterChange = useCallback(async (newFilters: Partial<ProductFilters>) => {
    setIsFilterLoading(true);
    setFilters((prev) => ({ ...prev, ...newFilters }));
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsFilterLoading(false);
  }, []);

  const handleSortChange = useCallback((value: 'price' | 'date' | 'stock') => {
    setSortBy(value);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Usar sortedProducts en lugar de filteredProducts para la paginación
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  useEffect(() => {
    const loadInitialData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    loadInitialData();
  }, []);

  return (
    <Bounded>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[calc(100vh-100px)]">
        <aside className="md:col-span-1">
          <ProductFilters
            onFilterChange={handleFilterChange}
            categories={categories}
            farmingMethods={farmingMethods}
          />
        </aside>

        <main className="md:col-span-3">
          <div className="flex flex-col h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
              </div>
              {sortedProducts.length > 0 && (
                <div className="flex items-center">
                  <div className="text-black/50 text-sm mr-4">
                    {t('sortBy.showing')} {(currentPage - 1) * itemsPerPage + 1}-
                    {Math.min(currentPage * itemsPerPage, sortedProducts.length)} {t('sortBy.of')}
                    {sortedProducts.length} {t('sortBy.products')}
                  </div>
                  <span className="text-black/50 text-sm font-medium mr-2">
                    {t('sortBy.label')}:
                  </span>
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px] border-0 active:border-0">
                      <SelectValue placeholder={t('sortBy.label')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price">{t('sortBy.price')}</SelectItem>
                      <SelectItem value="date">{t('sortBy.date')}</SelectItem>
                      <SelectItem value="stock">{t('sortBy.stock')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="flex-grow">
              {sortedProducts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm h-full">
                  <ProductGrid
                    products={currentProducts}
                    viewMode={'grid'}
                    onProductClick={handleProductClick}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                    isFilterLoading={isFilterLoading}
                  />
                </div>
              ) : (
                <ProductGrid
                  products={currentProducts}
                  viewMode={'grid'}
                  onProductClick={handleProductClick}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  isLoading={isLoading}
                  isFilterLoading={isFilterLoading}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </Bounded>
  );
}
