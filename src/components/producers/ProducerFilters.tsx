'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X, MapPin, Award, Leaf } from 'lucide-react';

export type ProducerFilterValues = {
  search: string;
  location: string;
  certification: string;
  farmingMethod: string;
  distance: number;
  rating: number;
};

interface ProducerFiltersProps {
  onFilterChange: (filters: ProducerFilterValues) => void;
  locations: string[];
  certifications: string[];
  farmingMethods: string[];
  filters: ProducerFilterValues;
  isMobile?: boolean;
  hideSearch?: boolean;
}

export function ProducerFilters({
  onFilterChange,
  locations,
  certifications,
  farmingMethods,
  filters,
  isMobile = false,
  hideSearch = false,
}: ProducerFiltersProps) {
  const t = useTranslations('Producers');
  const [localFilters, setLocalFilters] = useState<ProducerFilterValues>(filters);

  // Keep 'all' in local UI state; normalize before emitting to parent
  const toParentFilters = (f: ProducerFilterValues): ProducerFilterValues => ({
    ...f,
    location: f.location === 'all' ? '' : f.location,
    certification: f.certification === 'all' ? '' : f.certification,
    farmingMethod: f.farmingMethod === 'all' ? '' : f.farmingMethod,
  });

  // Sync local filters with prop changes
  useEffect(() => {
    setLocalFilters({
      ...filters,
      location: filters.location || 'all',
      certification: filters.certification || 'all',
      farmingMethod: filters.farmingMethod || 'all',
    });
  }, [filters]);

  const handleSearchChange = (value: string) => {
    const newFilters = { ...localFilters, search: value };
    setLocalFilters(newFilters);
    onFilterChange(toParentFilters(newFilters));
  };

  const handleLocationChange = (value: string) => {
    const newFilters = { ...localFilters, location: value };
    setLocalFilters(newFilters);
    onFilterChange(toParentFilters(newFilters));
  };

  const handleCertificationChange = (value: string) => {
    const newFilters = { ...localFilters, certification: value };
    setLocalFilters(newFilters);
    onFilterChange(toParentFilters(newFilters));
  };

  const handleFarmingMethodChange = (value: string) => {
    const newFilters = { ...localFilters, farmingMethod: value };
    setLocalFilters(newFilters);
    onFilterChange(toParentFilters(newFilters));
  };

  const handleDistanceChange = (value: number[]) => {
    const newFilters = { ...localFilters, distance: value[0] };
    setLocalFilters(newFilters);
    onFilterChange(toParentFilters(newFilters));
  };

  const handleRatingChange = (value: number[]) => {
    const newFilters = { ...localFilters, rating: value[0] };
    setLocalFilters(newFilters);
    onFilterChange(toParentFilters(newFilters));
  };

  const clearFilters = () => {
    const clearedFiltersLocal = {
      search: '',
      location: 'all',
      certification: 'all',
      farmingMethod: 'all',
      distance: 50,
      rating: 0,
    };
    setLocalFilters(clearedFiltersLocal);
    onFilterChange(toParentFilters(clearedFiltersLocal));
  };

  const hasActiveFilters = Object.values(localFilters).some(
    (value) => value !== '' && value !== 'all' && value !== 0 && value !== 50
  );

  return (
    <Card className={isMobile ? "bg-white border-gray-200" : "bg-white/10 backdrop-blur-sm border-white/20"}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className={isMobile ? "text-gray-900 flex items-center gap-2" : "text-white flex items-center gap-2"}>
            <Search className="w-5 h-5" />
            {t('filters.label')}
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className={isMobile ? "text-gray-500 hover:text-gray-700" : "text-white hover:text-gray-300"}
              type="button"
              aria-label={t('filters.clearAll')}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search */}
        {!hideSearch && (
          <div className="space-y-2">
            <label htmlFor="producers-search" className={isMobile ? "text-gray-900 text-sm font-medium" : "text-white text-sm font-medium"}>
              {t('filters.search')}
            </label>
            <Input
              id="producers-search"
              placeholder={t('filters.search')}
              value={localFilters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={isMobile ? "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500" : "bg-white/10 border-white/20 text-white placeholder:text-gray-300"}
            />
          </div>
        )}

        {/* Location */}
        <div className="space-y-2">
          <label id="location-label" className={isMobile ? "text-gray-900 text-sm font-medium flex items-center gap-2" : "text-white text-sm font-medium flex items-center gap-2"}>
            <MapPin className="w-4 h-4" />
            {t('filters.location')}
          </label>
          <Select value={localFilters.location} onValueChange={handleLocationChange}>
            <SelectTrigger aria-labelledby="location-label" className={isMobile ? "bg-white border-gray-300 text-gray-900" : "bg-white/10 border-white/20 text-white"}>
              <SelectValue placeholder={t('filters.location')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('filters.any')}</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Certification */}
        <div className="space-y-2">
          <label id="certification-label" className={isMobile ? "text-gray-900 text-sm font-medium flex items-center gap-2" : "text-white text-sm font-medium flex items-center gap-2"}>
            <Award className="w-4 h-4" />
            {t('filters.certification')}
          </label>
          <Select value={localFilters.certification} onValueChange={handleCertificationChange}>
            <SelectTrigger aria-labelledby="certification-label" className={isMobile ? "bg-white border-gray-300 text-gray-900" : "bg-white/10 border-white/20 text-white"}>
              <SelectValue placeholder={t('filters.certification')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('filters.any')}</SelectItem>
              {certifications.map((cert) => (
                <SelectItem key={cert} value={cert}>
                  {cert === 'organic' ? t('producerCard.organic') : 
                   cert === 'fair-trade' ? t('producerCard.fairTrade') : cert}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Farming Method */}
        <div className="space-y-2">
          <label id="method-label" className={isMobile ? "text-gray-900 text-sm font-medium flex items-center gap-2" : "text-white text-sm font-medium flex items-center gap-2"}>
            <Leaf className="w-4 h-4" />
            {t('filters.farmingMethod')}
          </label>
          <Select value={localFilters.farmingMethod} onValueChange={handleFarmingMethodChange}>
            <SelectTrigger aria-labelledby="method-label" className={isMobile ? "bg-white border-gray-300 text-gray-900" : "bg-white/10 border-white/20 text-white"}>
              <SelectValue placeholder={t('filters.farmingMethod')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('filters.any')}</SelectItem>
              {farmingMethods.map((method) => (
                <SelectItem key={method} value={method}>
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Distance */}
        <div className="space-y-3">
          <label className={isMobile ? "text-gray-900 text-sm font-medium" : "text-white text-sm font-medium"}>
            {t('filters.distance')}: {localFilters.distance} km
          </label>
          <Slider
            value={[localFilters.distance]}
            onValueChange={handleDistanceChange}
            max={100}
            min={1}
            step={1}
            className="w-full"
            aria-label={t('filters.distance')}
          />
        </div>

        {/* Rating */}
        <div className="space-y-3">
          <label className={isMobile ? "text-gray-900 text-sm font-medium" : "text-white text-sm font-medium"}>
            {t('filters.rating')}: {localFilters.rating > 0 ? `${localFilters.rating}+ ⭐` : t('filters.any')}
          </label>
          <Slider
            value={[localFilters.rating]}
            onValueChange={handleRatingChange}
            max={5}
            min={0}
            step={1}
            className="w-full"
            aria-label={t('filters.rating')}
          />
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="space-y-2">
            <label className={isMobile ? "text-gray-900 text-sm font-medium" : "text-white text-sm font-medium"}>{t('filters.active')}:</label>
            <div className="flex flex-wrap gap-2">
              {localFilters.search && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {t('filters.labels.search')}: {localFilters.search}
                  <button
                    onClick={() => handleSearchChange('')}
                    className="ml-1 hover:text-green-600"
                    type="button"
                    aria-label={t('filters.clearSearch')}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {localFilters.location && localFilters.location !== 'all' && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {t('filters.labels.location')}: {localFilters.location}
                  <button
                    onClick={() => handleLocationChange('all')}
                    className="ml-1 hover:text-green-600"
                    type="button"
                    aria-label={t('filters.clearLocation')}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {localFilters.certification && localFilters.certification !== 'all' && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {t('filters.labels.cert')}: {localFilters.certification}
                  <button
                    onClick={() => handleCertificationChange('all')}
                    className="ml-1 hover:text-green-600"
                    type="button"
                    aria-label={t('filters.clearCertification')}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {localFilters.farmingMethod && localFilters.farmingMethod !== 'all' && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {t('filters.labels.method')}: {localFilters.farmingMethod}
                  <button
                    onClick={() => handleFarmingMethodChange('all')}
                    className="ml-1 hover:text-green-600"
                    type="button"
                    aria-label={t('filters.clearMethod')}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {localFilters.distance !== 50 && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {t('filters.labels.distance')}: {localFilters.distance} km
                  <button
                    onClick={() => handleDistanceChange([50])}
                    className="ml-1 hover:text-green-600"
                    type="button"
                    aria-label={t('filters.clearDistance')}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {localFilters.rating > 0 && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {t('filters.labels.rating')}: {localFilters.rating}+
                  <button
                    onClick={() => handleRatingChange([0])}
                    className="ml-1 hover:text-green-600"
                    type="button"
                    aria-label={t('filters.clearRating')}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

