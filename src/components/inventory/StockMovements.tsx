'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useInventoryStore } from '@/store';
import { Search, Filter, TrendingUp, TrendingDown, Package, Clock, User } from 'lucide-react';

export function StockMovements() {
  const t = useTranslations('inventory');
  const { movements, products } = useInventoryStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<string>('all');

  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'in':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'out':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'adjustment':
        return <Package className="h-4 w-4 text-blue-600" />;
      case 'reservation':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'return':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const getMovementColor = (type: string) => {
    switch (type) {
      case 'in':
        return 'bg-green-100 text-green-800';
      case 'out':
        return 'bg-red-100 text-red-800';
      case 'adjustment':
        return 'bg-blue-100 text-blue-800';
      case 'reservation':
        return 'bg-yellow-100 text-yellow-800';
      case 'return':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMovements = movements.filter((movement) => {
    const product = products.find((p) => p.id === movement.productId);
    const matchesSearch =
      product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || movement.type === selectedType;
    const matchesProduct = selectedProduct === 'all' || movement.productId === selectedProduct;

    return matchesSearch && matchesType && matchesProduct;
  });

  const productOptions = products.map((product) => ({
    id: product.id,
    name: product.name,
  }));

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {t('movements.filters')}
          </CardTitle>
          <CardDescription>{t('movements.filtersDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('movements.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t('movements.selectType')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('movements.allTypes')}</SelectItem>
                <SelectItem value="in">{t('movements.type.in')}</SelectItem>
                <SelectItem value="out">{t('movements.type.out')}</SelectItem>
                <SelectItem value="adjustment">{t('movements.type.adjustment')}</SelectItem>
                <SelectItem value="reservation">{t('movements.type.reservation')}</SelectItem>
                <SelectItem value="return">{t('movements.type.return')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t('movements.selectProduct')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('movements.allProducts')}</SelectItem>
                {productOptions.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Movements Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('movements.title')}</CardTitle>
          <CardDescription>
            {t('movements.description', { count: filteredMovements.length })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('movements.columns.date')}</TableHead>
                  <TableHead>{t('movements.columns.product')}</TableHead>
                  <TableHead>{t('movements.columns.type')}</TableHead>
                  <TableHead>{t('movements.columns.quantity')}</TableHead>
                  <TableHead>{t('movements.columns.reason')}</TableHead>
                  <TableHead>{t('movements.columns.user')}</TableHead>
                  <TableHead>{t('movements.columns.balance')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMovements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <TrendingUp className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">{t('movements.noMovements')}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMovements.map((movement) => {
                    const product = products.find((p) => p.id === movement.productId);
                    return (
                      <TableRow key={movement.id}>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(movement.performedAt).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(movement.performedAt).toLocaleTimeString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{product?.name || 'Unknown Product'}</div>
                          <div className="text-sm text-muted-foreground">
                            {product?.sku || 'No SKU'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getMovementIcon(movement.type)}
                            <Badge className={getMovementColor(movement.type)}>
                              {t(`movements.type.${movement.type}`)}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`font-medium ${
                              movement.type === 'in' || movement.type === 'return'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {movement.type === 'in' || movement.type === 'return' ? '+' : '-'}
                            {movement.quantity}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {t('movements.from', { quantity: movement.previousQuantity })}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <div className="text-sm">{movement.reason}</div>
                            {movement.notes && (
                              <div className="text-xs text-muted-foreground">{movement.notes}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{movement.performedBy}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-right">
                            <div className="font-medium">{movement.newQuantity}</div>
                            <div className="text-xs text-muted-foreground">
                              {t('movements.newBalance')}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
