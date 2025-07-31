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
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  User,
} from 'lucide-react';

export function InventoryAdjustments() {
  const t = useTranslations('inventory');
  const { adjustments, products, approveAdjustment, rejectAdjustment } = useInventoryStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'correction':
        return 'bg-blue-100 text-blue-800';
      case 'damage':
        return 'bg-red-100 text-red-800';
      case 'loss':
        return 'bg-orange-100 text-orange-800';
      case 'theft':
        return 'bg-purple-100 text-purple-800';
      case 'quality_control':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAdjustments = adjustments.filter((adjustment) => {
    const product = products.find((p) => p.id === adjustment.productId);
    const matchesSearch =
      product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adjustment.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || adjustment.status === selectedStatus;
    const matchesType = selectedType === 'all' || adjustment.adjustmentType === selectedType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleApprove = (adjustmentId: string) => {
    approveAdjustment(adjustmentId, 'current-user');
  };

  const handleReject = (adjustmentId: string) => {
    const reason = prompt(t('adjustments.rejectReason'));
    if (reason) {
      rejectAdjustment(adjustmentId, reason);
    }
    // TODO: Implement proper modal dialog for rejection reason  
   // setShowRejectModal({ adjustmentId, isOpen: true });  
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {t('adjustments.filters')}
          </CardTitle>
          <CardDescription>{t('adjustments.filtersDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('adjustments.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t('adjustments.selectStatus')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('adjustments.allStatuses')}</SelectItem>
                <SelectItem value="pending">{t('adjustments.status.pending')}</SelectItem>
                <SelectItem value="approved">{t('adjustments.status.approved')}</SelectItem>
                <SelectItem value="rejected">{t('adjustments.status.rejected')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t('adjustments.selectType')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('adjustments.allTypes')}</SelectItem>
                <SelectItem value="correction">{t('adjustments.type.correction')}</SelectItem>
                <SelectItem value="damage">{t('adjustments.type.damage')}</SelectItem>
                <SelectItem value="loss">{t('adjustments.type.loss')}</SelectItem>
                <SelectItem value="theft">{t('adjustments.type.theft')}</SelectItem>
                <SelectItem value="quality_control">
                  {t('adjustments.type.quality_control')}
                </SelectItem>
              </SelectContent>
            </Select>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {t('adjustments.createAdjustment')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Adjustments Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('adjustments.title')}</CardTitle>
          <CardDescription>
            {t('adjustments.description', { count: filteredAdjustments.length })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('adjustments.columns.date')}</TableHead>
                  <TableHead>{t('adjustments.columns.product')}</TableHead>
                  <TableHead>{t('adjustments.columns.type')}</TableHead>
                  <TableHead>{t('adjustments.columns.quantity')}</TableHead>
                  <TableHead>{t('adjustments.columns.reason')}</TableHead>
                  <TableHead>{t('adjustments.columns.status')}</TableHead>
                  <TableHead>{t('adjustments.columns.user')}</TableHead>
                  <TableHead>{t('adjustments.columns.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdjustments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">{t('adjustments.noAdjustments')}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAdjustments.map((adjustment) => {
                    const product = products.find((p) => p.id === adjustment.productId);
                    return (
                      <TableRow key={adjustment.id}>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(adjustment.createdAt).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(adjustment.createdAt).toLocaleTimeString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{product?.name || 'Unknown Product'}</div>
                          <div className="text-sm text-muted-foreground">
                            {product?.sku || 'No SKU'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(adjustment.adjustmentType)}>
                            {t(`adjustments.type.${adjustment.adjustmentType}`)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-red-600">-{adjustment.quantity}</div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <div className="text-sm">{adjustment.reason}</div>
                            {adjustment.notes && (
                              <div className="text-xs text-muted-foreground">
                                {adjustment.notes}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(adjustment.status)}
                            <Badge className={getStatusColor(adjustment.status)}>
                              {t(`adjustments.status.${adjustment.status}`)}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{adjustment.createdBy}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {adjustment.status === 'pending' && (
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleApprove(adjustment.id)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReject(adjustment.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                          {adjustment.status === 'approved' && adjustment.approvedBy && (
                            <div className="text-xs text-muted-foreground">
                              {t('adjustments.approvedBy', { user: adjustment.approvedBy })}
                            </div>
                          )}
                          {adjustment.status === 'rejected' && (
                            <div className="text-xs text-muted-foreground">
                              {t('adjustments.rejected')}
                            </div>
                          )}
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
