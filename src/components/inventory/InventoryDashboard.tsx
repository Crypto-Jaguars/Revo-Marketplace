'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useInventoryStore } from '@/store';
import { InventoryMetrics } from '@/components/inventory/InventoryMetrics';
import { ProductList } from '@/components/inventory/ProductList';
import { StockMovements } from '@/components/inventory/StockMovements';
import { InventoryAdjustments } from '@/components/inventory/InventoryAdjustments';
import { BulkOperations } from '@/components/inventory/BulkOperations';
import {
  Package,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Plus,
  Upload,
  Download,
  Settings,
} from 'lucide-react';

export function InventoryDashboard() {
  const t = useTranslations('inventory');
  const { metrics, isLoading } = useInventoryStore();
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'bg-green-100 text-green-800';
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {t('actions.addProduct')}
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            {t('actions.import')}
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            {t('actions.export')}
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          {t('actions.settings')}
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('metrics.totalProducts')}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalProducts}</div>
            <p className="text-xs text-muted-foreground">{t('metrics.activeProducts')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('metrics.totalValue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{t('metrics.inventoryValue')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('metrics.lowStock')}</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{metrics.lowStockItems}</div>
            <p className="text-xs text-muted-foreground">{t('metrics.needsAttention')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('metrics.outOfStock')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{metrics.outOfStockItems}</div>
            <p className="text-xs text-muted-foreground">{t('metrics.requiresRestocking')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">{t('tabs.overview')}</TabsTrigger>
          <TabsTrigger value="products">{t('tabs.products')}</TabsTrigger>
          <TabsTrigger value="movements">{t('tabs.movements')}</TabsTrigger>
          <TabsTrigger value="adjustments">{t('tabs.adjustments')}</TabsTrigger>
          <TabsTrigger value="bulk">{t('tabs.bulkOperations')}</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="overview" className="m-0">
            <InventoryMetrics />
          </TabsContent>

          <TabsContent value="products" className="m-0">
            <ProductList />
          </TabsContent>

          <TabsContent value="movements" className="m-0">
            <StockMovements />
          </TabsContent>

          <TabsContent value="adjustments" className="m-0">
            <InventoryAdjustments />
          </TabsContent>

          <TabsContent value="bulk" className="m-0">
            <BulkOperations />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
