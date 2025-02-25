"use client";

import { CalendarIcon } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from 'next-intl';
import type { OrderFilters, OrderStatus } from "./types";

interface OrderFilterProps {
  filters: OrderFilters;
  onFilterChange: (filters: OrderFilters) => void;
}

export function OrderFilter({ filters, onFilterChange }: OrderFilterProps) {
  const t = useTranslations('OrderHistory');

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange({ ...filters, search: e.target.value });
    },
    [filters, onFilterChange]
  );

  const handleStatusChange = useCallback(
    (value: string) => {
      onFilterChange({ ...filters, status: value as OrderStatus | "all" });
    },
    [filters, onFilterChange]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      onFilterChange({ ...filters, sortBy: value });
    },
    [filters, onFilterChange]
  );


  const handleAmountChange = useCallback(
    (type: "min" | "max", value: string) => {
      const amount = value.trim() === "" ? null : Number.parseFloat(value);
      if (amount !== null && (isNaN(amount) || amount < 0)) {
        return; 
      }
      onFilterChange({
        ...filters,
        [type === "min" ? "minAmount" : "maxAmount"]: amount,
      });
    },
    [filters, onFilterChange]
  );

  

  const handleDateRangeChange = useCallback(
    (range: { from?: Date; to?: Date } | undefined) => {
      onFilterChange({
        ...filters,
        dateRange: {
          start: range?.from || null,
          end: range?.to || null,
        },
      });
    },
    [filters, onFilterChange]
  );

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-sm font-medium mb-2">{t('filters.search')}</h2>
        <Input
          placeholder={t('filters.search')}
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>

      <div>
        <h2 className="text-sm font-medium mb-2">{t('filters.dateRange')}</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.dateRange.start
                ? `${filters.dateRange.start.toLocaleDateString()} - ${
                    filters.dateRange.end?.toLocaleDateString() || t('filters.present')
                  }`
                : t('filters.dateRange')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={filters.dateRange.start || undefined}
              selected={{
                from: filters.dateRange.start || undefined,
                to: filters.dateRange.end || undefined,
              }}
              onSelect={handleDateRangeChange}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <h2 className="text-sm font-medium mb-2">{t('filters.status')}</h2>
        <Select value={filters.status} onValueChange={handleStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder={t('status.all')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('status.all')}</SelectItem>
            <SelectItem value="pending">{t('status.pending')}</SelectItem>
            <SelectItem value="processing">{t('status.processing')}</SelectItem>
            <SelectItem value="delivered">{t('status.delivered')}</SelectItem>
            <SelectItem value="cancelled">{t('status.cancelled')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h2 className="text-sm font-medium mb-2">{t('filters.sortBy')}</h2>
        <Select value={filters.sortBy} onValueChange={handleSortChange}>
          <SelectTrigger>
            <SelectValue placeholder={t('filters.sortBy')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">{t('sortBy.dateDesc')}</SelectItem>
            <SelectItem value="date-asc">{t('sortBy.dateAsc')}</SelectItem>
            <SelectItem value="total-desc">{t('sortBy.totalDesc')}</SelectItem>
            <SelectItem value="total-asc">{t('sortBy.totalAsc')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h2 className="text-sm font-medium mb-2">{t('filters.amountRange')}</h2>
        <div className="space-y-2">
          <Input
            type="number"
            placeholder={t('filters.minAmount')}
            max={filters.maxAmount || undefined}
            value={filters.minAmount || ""}
            onChange={(e) => handleAmountChange("min", e.target.value)}
          />
          <Input
            type="number"
            placeholder={t('filters.maxAmount')}
            max={filters.maxAmount || undefined}
            value={filters.maxAmount || ""}
            onChange={(e) => handleAmountChange("max", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}