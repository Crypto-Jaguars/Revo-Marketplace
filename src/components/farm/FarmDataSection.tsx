'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { MapPin, Tractor, Leaf, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FarmData {
  farmName: string;
  location: string;
  size: string;
  cultivationMethod: string;
}

interface FarmDataSectionProps {
  initialData?: Partial<FarmData>;
  onSubmit?: (data: FarmData) => void;
  onDataChange?: (data: FarmData) => void;
  className?: string;
}

// Sample location data - in a real app, this would come from an API
const locationSuggestions = [
  'California, USA',
  'Texas, USA',
  'Florida, USA',
  'New York, USA',
  'Washington, USA',
  'Oregon, USA',
  'Arizona, USA',
  'Colorado, USA',
  'Montana, USA',
  'Iowa, USA',
  'Nebraska, USA',
  'Kansas, USA',
  'Oklahoma, USA',
  'Arkansas, USA',
  'Louisiana, USA',
  'Mississippi, USA',
  'Alabama, USA',
  'Georgia, USA',
  'South Carolina, USA',
  'North Carolina, USA',
  'Tennessee, USA',
  'Kentucky, USA',
  'Ohio, USA',
  'Indiana, USA',
  'Illinois, USA',
  'Wisconsin, USA',
  'Minnesota, USA',
  'North Dakota, USA',
  'South Dakota, USA',
  'Wyoming, USA',
  'Utah, USA',
  'Nevada, USA',
  'Idaho, USA',
  'New Mexico, USA',
  'Alberta, Canada',
  'British Columbia, Canada',
  'Ontario, Canada',
  'Quebec, Canada',
  'Saskatchewan, Canada',
  'Manitoba, Canada',
];

const cultivationMethods = [
  { value: 'organic', label: 'Organic', description: 'Certified organic farming practices' },
  {
    value: 'conventional',
    label: 'Conventional',
    description: 'Traditional farming with modern techniques',
  },
  {
    value: 'mixed',
    label: 'Mixed',
    description: 'Combination of organic and conventional methods',
  },
];

export function FarmDataSection({
  initialData = {},
  onSubmit,
  onDataChange,
  className,
}: FarmDataSectionProps) {
  const [farmData, setFarmData] = useState<FarmData>({
    farmName: initialData.farmName || '',
    location: initialData.location || '',
    size: initialData.size || '',
    cultivationMethod: initialData.cultivationMethod || '',
  });

  const [locationOpen, setLocationOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FarmData, string>>>({});

  const handleInputChange = useCallback(
    (field: keyof FarmData, value: string) => {
      const newData = { ...farmData, [field]: value };
      setFarmData(newData);

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }

      onDataChange?.(newData);
    },
    [farmData, errors, onDataChange]
  );

  const validateField = useCallback((field: keyof FarmData, value: string): string | undefined => {
    switch (field) {
      case 'farmName':
        if (!value.trim()) return 'Farm name is required';
        if (value.trim().length < 2) return 'Farm name must be at least 2 characters';
        break;
      case 'location':
        if (!value.trim()) return 'Location is required';
        break;
      case 'size': {
        if (!value.trim()) return 'Farm size is required';
        const sizeNum = parseFloat(value);
        if (isNaN(sizeNum) || sizeNum <= 0) return 'Please enter a valid size in hectares';
        if (sizeNum > 10000) return 'Size seems unusually large. Please verify.';
        break;
      }
      case 'cultivationMethod':
        if (!value) return 'Cultivation method is required';
        break;
    }
    return undefined;
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const newErrors: Partial<Record<keyof FarmData, string>> = {};
      let hasErrors = false;

      // Validate all fields
      Object.keys(farmData).forEach((field) => {
        const error = validateField(field as keyof FarmData, farmData[field as keyof FarmData]);
        if (error) {
          newErrors[field as keyof FarmData] = error;
          hasErrors = true;
        }
      });

      setErrors(newErrors);

      if (!hasErrors) {
        onSubmit?.(farmData);
      }
    },
    [farmData, validateField, onSubmit]
  );

  const filteredLocations = locationSuggestions.filter((location) =>
    location.toLowerCase().includes(farmData.location.toLowerCase())
  );

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#375B42]">
          <Tractor className="h-5 w-5" />
          Farm Data
        </CardTitle>
        <CardDescription>
          Provide specific information about your farm to help buyers understand your operation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Farm Name */}
          <div className="space-y-2">
            <Label htmlFor="farmName" className="text-sm font-medium">
              Farm Name *
            </Label>
            <Input
              id="farmName"
              value={farmData.farmName}
              onChange={(e) => handleInputChange('farmName', e.target.value)}
              placeholder="Enter your farm name"
              className={cn(
                'transition-colors',
                errors.farmName && 'border-red-500 focus:border-red-500'
              )}
            />
            {errors.farmName && <p className="text-sm text-red-500">{errors.farmName}</p>}
          </div>

          {/* Location with Autocomplete */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
              Location *
            </Label>
            <Popover open={locationOpen} onOpenChange={setLocationOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={locationOpen}
                  aria-label="Location"
                  className={cn(
                    'w-full justify-between font-normal',
                    !farmData.location && 'text-muted-foreground',
                    errors.location && 'border-red-500 focus:border-red-500'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {farmData.location || 'Select or type location...'}
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput
                    placeholder="Search location..."
                    value={farmData.location}
                    onValueChange={(value) => handleInputChange('location', value)}
                  />
                  <CommandList>
                    <CommandEmpty>No location found.</CommandEmpty>
                    <CommandGroup>
                      {filteredLocations.map((location) => (
                        <CommandItem
                          key={location}
                          value={location}
                          onSelect={(currentValue) => {
                            handleInputChange('location', currentValue);
                            setLocationOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              farmData.location === location ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          <MapPin className="mr-2 h-4 w-4" />
                          {location}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
          </div>

          {/* Size and Cultivation Method Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Farm Size */}
            <div className="space-y-2">
              <Label htmlFor="size" className="text-sm font-medium">
                Size (hectares) *
              </Label>
              <Input
                id="size"
                type="number"
                step="0.1"
                min="0"
                value={farmData.size}
                onChange={(e) => handleInputChange('size', e.target.value)}
                placeholder="e.g., 5.5"
                className={cn(
                  'transition-colors',
                  errors.size && 'border-red-500 focus:border-red-500'
                )}
              />
              {errors.size && <p className="text-sm text-red-500">{errors.size}</p>}
              <p className="text-xs text-muted-foreground">
                Enter the total area of your farm in hectares
              </p>
            </div>

            {/* Cultivation Method */}
            <div className="space-y-2">
              <Label htmlFor="cultivationMethod" className="text-sm font-medium">
                Cultivation Method *
              </Label>
              <Select
                value={farmData.cultivationMethod}
                onValueChange={(value) => handleInputChange('cultivationMethod', value)}
              >
                <SelectTrigger
                  className={cn(errors.cultivationMethod && 'border-red-500 focus:border-red-500')}
                  aria-label="Cultivation Method"
                >
                  <SelectValue placeholder="Select method">
                    {farmData.cultivationMethod && (
                      <div className="flex items-center gap-2">
                        <Leaf className="h-4 w-4" />
                        {
                          cultivationMethods.find(
                            (method) => method.value === farmData.cultivationMethod
                          )?.label
                        }
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {cultivationMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      <div className="flex items-center gap-2">
                        <Leaf className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{method.label}</div>
                          <div className="text-xs text-muted-foreground">{method.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.cultivationMethod && (
                <p className="text-sm text-red-500">{errors.cultivationMethod}</p>
              )}
            </div>
          </div>

          {/* Contextual Help */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Need Help?</h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>
                • <strong>Farm Name:</strong> Use your official business name or a memorable name
                for your farm
              </li>
              <li>
                • <strong>Location:</strong> Include city, state/province, and country for better
                visibility
              </li>
              <li>
                • <strong>Size:</strong> 1 hectare = 2.47 acres. Be as accurate as possible
              </li>
              <li>
                • <strong>Method:</strong> Choose the primary cultivation method you use
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          {onSubmit && (
            <Button type="submit" className="w-full bg-[#375B42] hover:bg-[#2A4632] text-white">
              Save Farm Data
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

export default FarmDataSection;
