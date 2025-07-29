'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useInventoryStore } from '@/store';
import { BarChart3, TrendingUp, Package, AlertTriangle, Clock, DollarSign } from 'lucide-react';

export function InventoryMetrics() {
  const t = useTranslations('inventory');
  const { metrics, products } = useInventoryStore();

  const calculateStockUtilization = () => {
    if (products.length === 0) return 0;
    const totalCapacity = products.reduce((sum, product) => sum + product.maxStockLevel, 0);
    const totalStock = products.reduce((sum, product) => sum + product.stockQuantity, 0);
    return totalCapacity > 0 ? (totalStock / totalCapacity) * 100 : 0;
  };

  const getTopProducts = () => {
    return products.sort((a, b) => b.stockQuantity - a.stockQuantity).slice(0, 5);
  };

  const getRecentMovements = () => {
    return metrics.recentMovements.slice(0, 5);
  };

  return (
    <div className="space-y-6">
      {/* Stock Utilization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            {t('metrics.stockUtilization')}
          </CardTitle>
          <CardDescription>{t('metrics.stockUtilizationDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('metrics.utilization')}</span>
              <span className="text-sm text-muted-foreground">
                {calculateStockUtilization().toFixed(1)}%
              </span>
            </div>
            <Progress value={calculateStockUtilization()} className="h-2" />
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium">{metrics.totalProducts}</div>
                <div className="text-muted-foreground">{t('metrics.totalItems')}</div>
              </div>
              <div>
                <div className="font-medium">{metrics.averageStockLevel.toFixed(0)}</div>
                <div className="text-muted-foreground">{t('metrics.avgStock')}</div>
              </div>
              <div>
                <div className="font-medium">{metrics.stockTurnoverRate.toFixed(1)}</div>
                <div className="text-muted-foreground">{t('metrics.turnoverRate')}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {t('metrics.topProducts')}
            </CardTitle>
            <CardDescription>{t('metrics.topProductsDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getTopProducts().map((product, index) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.category}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{product.stockQuantity}</div>
                    <div className="text-sm text-muted-foreground">
                      ${(product.price.amount * product.stockQuantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Movements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {t('metrics.recentMovements')}
            </CardTitle>
            <CardDescription>{t('metrics.recentMovementsDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getRecentMovements().map((movement) => (
                <div key={movement.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        movement.type === 'in'
                          ? 'bg-green-500'
                          : movement.type === 'out'
                            ? 'bg-red-500'
                            : 'bg-blue-500'
                      }`}
                    />
                    <div>
                      <div className="font-medium text-sm">
                        {products.find((p) => p.id === movement.productId)?.name ||
                          'Unknown Product'}
                      </div>
                      <div className="text-xs text-muted-foreground">{movement.reason}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-medium text-sm ${
                        movement.type === 'in'
                          ? 'text-green-600'
                          : movement.type === 'out'
                            ? 'text-red-600'
                            : 'text-blue-600'
                      }`}
                    >
                      {movement.type === 'in' ? '+' : '-'}
                      {movement.quantity}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(movement.performedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            {t('metrics.alerts')}
          </CardTitle>
          <CardDescription>{t('metrics.alertsDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics.lowStockItems > 0 && (
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <div className="font-medium">{t('metrics.lowStockAlert')}</div>
                    <div className="text-sm text-muted-foreground">
                      {metrics.lowStockItems} {t('metrics.itemsNeedAttention')}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  {metrics.lowStockItems}
                </Badge>
              </div>
            )}

            {metrics.outOfStockItems > 0 && (
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <div>
                    <div className="font-medium">{t('metrics.outOfStockAlert')}</div>
                    <div className="text-sm text-muted-foreground">
                      {metrics.outOfStockItems} {t('metrics.itemsOutOfStock')}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  {metrics.outOfStockItems}
                </Badge>
              </div>
            )}

            {metrics.lowStockItems === 0 && metrics.outOfStockItems === 0 && (
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">{t('metrics.allGood')}</div>
                    <div className="text-sm text-muted-foreground">{t('metrics.noAlerts')}</div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  OK
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
