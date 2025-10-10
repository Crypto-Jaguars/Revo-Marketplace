'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Bounded from '@/components/Bounded';
import { ProducerGrid } from '@/components/producers/ProducerGrid';
import { ProducerFilters, ProducerFilterValues } from '@/components/producers/ProducerFilters';
import { producersMock } from '@/mocks/producers';
import { Producer } from '@/types/producer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchStore } from '@/store';
import { Filter, X, Search } from 'lucide-react';
import ProducerHeroSection from './HeroSection';

// Using shared type from ProducerFilters component
type ProducerFiltersState = ProducerFilterValues;

export default function ProducersPage() {
  const t = useTranslations('Producers');
  const { searchTerm } = useSearchStore();
  const locale = useLocale();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'name' | 'products'>('distance');
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const itemsPerPage = 12;

  const [filters, setFilters] = useState<ProducerFiltersState>({
    search: searchTerm,
    location: 'all',
    certification: 'all',
    farmingMethod: 'all',
    distance: 50,
    rating: 0,
  });

  // Update search term in filters when it changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: searchTerm,
    }));
    setHasMore(true);
  }, [searchTerm]);

  const handleProducerClick = useCallback((producer: Producer) => {
    console.log('Producer clicked:', producer);
    // Navigate to producer profile
  }, []);

  const filteredProducers = useMemo(() => {
    let filtered = producersMock;

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (producer) =>
          producer.farmName.toLowerCase().includes(searchLower) ||
          producer.name.toLowerCase().includes(searchLower) ||
          producer.location.toLowerCase().includes(searchLower) ||
          producer.specialties.some(specialty => 
            specialty.toLowerCase().includes(searchLower)
          )
      );
    }

    if (filters.location && filters.location !== 'all') {
      filtered = filtered.filter((producer) =>
        producer.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.certification && filters.certification !== 'all') {
      filtered = filtered.filter((producer) =>
        producer.certifications.includes(filters.certification)
      );
    }

    if (filters.farmingMethod && filters.farmingMethod !== 'all') {
      filtered = filtered.filter((producer) =>
        producer.farmingMethod === filters.farmingMethod
      );
    }

    if (filters.rating > 0) {
      filtered = filtered.filter((producer) =>
        producer.rating >= filters.rating
      );
    }

    if (filters.distance < 100) {
      filtered = filtered.filter((producer) =>
        producer.distance <= filters.distance
      );
    }

    return filtered;
  }, [filters, locale]);

  const sortedProducers = useMemo(() => {
    const sorted = [...filteredProducers];

    switch (sortBy) {
      case 'distance':
        return sorted.sort((a, b) => a.distance - b.distance);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'name':
        return sorted.sort((a, b) => a.farmName.localeCompare(b.farmName, locale));
      case 'products':
        return sorted.sort((a, b) => b.products - a.products);
      default:
        return sorted;
    }
  }, [filteredProducers, sortBy]);

  const paginatedProducers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedProducers.slice(0, endIndex);
  }, [sortedProducers, currentPage, itemsPerPage]);

  const handleFilterChange = useCallback((newFilters: Partial<ProducerFiltersState>) => {
    // Add a small delay to prevent rapid DOM updates
    setTimeout(() => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
      setCurrentPage(1);
      setHasMore(true);
    }, 0);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value as 'distance' | 'rating' | 'name' | 'products');
    setCurrentPage(1);
    setHasMore(true);
  }, []);

  const handleLoadMore = useCallback(() => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    
    if (startIndex >= sortedProducers.length) {
      setHasMore(false);
    } else {
      setCurrentPage(nextPage);
    }
  }, [currentPage, itemsPerPage, sortedProducers.length]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(false);
    };
    loadInitialData();
  }, []);

  // Get unique values for filters
  const locations = useMemo(() => {
    const uniqueLocations = Array.from(new Set(producersMock.map(p => p.location)));
    return uniqueLocations;
  }, []);

  const certifications = useMemo(() => {
    const uniqueCertifications = Array.from(new Set(producersMock.flatMap(p => p.certifications)));
    return uniqueCertifications;
  }, []);

  const farmingMethods = useMemo(() => {
    const uniqueMethods = Array.from(new Set(producersMock.map(p => p.farmingMethod)));
    return uniqueMethods;
  }, []);

  return (
    <Bounded>
      {/* Hero Section */}
      <ProducerHeroSection />

      {/* Mobile Search and Filter */}
      <div className="md:hidden mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Input
            placeholder={t('filters.search')}
            value={filters.search}
            onChange={(e) => handleFilterChange({ ...filters, search: e.target.value })}
            className="w-full bg-white/10 border-gray-400 text-white placeholder:text-gray-300 pr-10 h-12 text-base"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
        </div>
        
        {/* Filter and Sort Controls */}
        <div className="flex gap-3">
          {/* Filter Button */}
          <Button
            onClick={() => setIsMobileFiltersOpen(true)}
            variant="outline"
            className="flex-1 h-12 justify-center gap-2 border-white/20 text-white hover:bg-white/10 bg-white/5"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">{t('filters.label')}</span>
          </Button>
          
          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={(value: 'distance' | 'rating' | 'name' | 'products') => setSortBy(value)}>
            <SelectTrigger className="flex-1 h-12 bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">{t('sortBy.distance')}</SelectItem>
              <SelectItem value="rating">{t('sortBy.rating')}</SelectItem>
              <SelectItem value="name">{t('sortBy.name')}</SelectItem>
              <SelectItem value="products">{t('sortBy.products')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{t('filters.label')}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            {/* Filter Content */}
            <div className="p-6">
              <ProducerFilters
                onFilterChange={(newFilters) => {
                  handleFilterChange(newFilters);
                  setIsMobileFiltersOpen(false);
                }}
                locations={locations}
                certifications={certifications}
                farmingMethods={farmingMethods}
                filters={filters}
                isMobile={true}
                hideSearch={true}
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[calc(100vh-200px)]">
        {/* Filters Sidebar - Desktop Only */}
        <aside className="hidden md:block md:col-span-1">
          <ProducerFilters
            onFilterChange={handleFilterChange}
            locations={locations}
            certifications={certifications}
            farmingMethods={farmingMethods}
            filters={filters}
          />
        </aside>

        {/* Main Content */}
        <main className="md:col-span-3">
          <div className="flex flex-col h-full">
            {/* Mobile Results Header */}
            <div className="md:hidden mb-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <h2 className="text-lg font-semibold text-white mb-1">
                  {filteredProducers.length} {t('breadcrumb.producers')}
                </h2>
                <p className="text-sm text-gray-300">
                  {filters.search ? `${t('hero.resultsFor')} "${filters.search}"` : t('hero.locationText')}
                </p>
              </div>
            </div>

            {/* Header with sorting */}
            <div className="hidden md:flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-semibold text-white">
                  {t('sortBy.showing')} {paginatedProducers.length} {t('sortBy.of')} {sortedProducers.length} {t('sortBy.producers')}
                </h2>
              </div>
              {sortedProducers.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-300 text-sm font-medium">
                    {t('sortBy.label')}:
                  </span>
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px] border-gray-600 bg-transparent text-white">
                      <SelectValue placeholder={t('sortBy.label')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distance">{t('sortBy.distance')}</SelectItem>
                      <SelectItem value="rating">{t('sortBy.rating')}</SelectItem>
                      <SelectItem value="name">{t('sortBy.name')}</SelectItem>
                      <SelectItem value="products">{t('sortBy.products')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Producer Grid */}
            <div className="flex-grow">
              <ProducerGrid
                producers={paginatedProducers}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onProducerClick={handleProducerClick}
              />
            </div>
          </div>
        </main>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-white mb-4">{t('cta.title')}</h2>
        <p className="text-green-100 text-lg mb-6 max-w-2xl mx-auto">
          {t('cta.description')}
        </p>
        <Button 
          size="lg" 
          className="bg-white text-green-700 hover:bg-green-50 font-semibold"
          onClick={() => {
            // Navigate to join farmer page
            window.location.href = '/join-farmer';
          }}
        >
          {t('cta.joinButton')}
        </Button>
      </div>
    </Bounded>
  );
}

