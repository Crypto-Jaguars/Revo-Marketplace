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
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Package,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

export function ProductList() {
  const t = useTranslations('inventory');
  const { products, filters, setFilters, deleteProduct } = useInventoryStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'bg-green-100 text-green-800';
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      case 'discontinued':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'low_stock':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'out_of_stock':
        return <Package className="h-4 w-4 text-red-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const handleDeleteProduct = (productId: string) => {
    if (confirm(t('products.deleteConfirmation'))) {
      deleteProduct(productId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {t('products.filters')}
          </CardTitle>
          <CardDescription>{t('products.filtersDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('products.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t('products.selectCategory')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('products.allCategories')}</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t('products.selectStatus')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('products.allStatuses')}</SelectItem>
                <SelectItem value="in_stock">{t('products.inStock')}</SelectItem>
                <SelectItem value="low_stock">{t('products.lowStock')}</SelectItem>
                <SelectItem value="out_of_stock">{t('products.outOfStock')}</SelectItem>
                <SelectItem value="discontinued">{t('products.discontinued')}</SelectItem>
              </SelectContent>
            </Select>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {t('products.addProduct')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('products.title')}</CardTitle>
          <CardDescription>
            {t('products.description', { count: filteredProducts.length })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('products.columns.product')}</TableHead>
                  <TableHead>{t('products.columns.sku')}</TableHead>
                  <TableHead>{t('products.columns.category')}</TableHead>
                  <TableHead>{t('products.columns.stock')}</TableHead>
                  <TableHead>{t('products.columns.price')}</TableHead>
                  <TableHead>{t('products.columns.status')}</TableHead>
                  <TableHead>{t('products.columns.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <Package className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">{t('products.noProducts')}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {product.images.length > 0 && (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-10 h-10 rounded object-cover"
                            />
                          )}
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {product.description.substring(0, 50)}...
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-sm bg-muted px-2 py-1 rounded">{product.sku}</code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-right">
                          <div className="font-medium">{product.stockQuantity}</div>
                          <div className="text-sm text-muted-foreground">
                            {t('products.available', { count: product.availableQuantity })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-right">
                          <div className="font-medium">${product.price.amount.toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">
                            {t('products.value', {
                              value: (product.price.amount * product.stockQuantity).toFixed(2),
                            })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(product.status)}
                          <Badge className={getStatusColor(product.status)}>
                            {t(`products.status.${product.status}`)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
