'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useInventoryStore } from '@/store';
import {
  Upload,
  Download,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Play,
  Pause,
  Trash2,
} from 'lucide-react';

export function BulkOperations() {
  const t = useTranslations('inventory');
  const { bulkOperations, startBulkOperation, updateBulkOperation } = useInventoryStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'processing':
        return <Play className="h-4 w-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'import':
        return <Upload className="h-4 w-4" />;
      case 'export':
        return <Download className="h-4 w-4" />;
      case 'update':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImport = () => {
    if (!selectedFile) return;

    const operation = {
      type: 'import' as const,
      status: 'pending' as const,
      fileName: selectedFile.name,
      totalRecords: 0,
      processedRecords: 0,
      failedRecords: 0,
      errors: [],
      createdBy: 'current-user',
    };

    // Assume startBulkOperation returns the operation with an id
    const startedOperation = startBulkOperation(operation);
    setSelectedFile(null);

    // Simulate processing
    setTimeout(() => {
      updateBulkOperation(startedOperation.id, { status: 'processing' });
    }, 1000);

    setTimeout(() => {
      updateBulkOperation(startedOperation.id, {
        status: 'completed',
        totalRecords: 150,
        processedRecords: 145,
        failedRecords: 5,
        errors: ['Invalid SKU format', 'Missing required field', 'Duplicate product'],
      });
    }, 3000);
  };

  const handleExport = () => {
    const operation = {
      type: 'export' as const,
      status: 'pending' as const,
      fileName: `inventory_export_${new Date().toISOString().split('T')[0]}.csv`,
      totalRecords: 0,
      processedRecords: 0,
      failedRecords: 0,
      errors: [],
      createdBy: 'current-user',
    };

    startBulkOperation(operation);

    // Simulate processing
    setTimeout(() => {
      updateBulkOperation(operation.id, { status: 'processing' });
    }, 1000);

    setTimeout(() => {
      updateBulkOperation(operation.id, {
        status: 'completed',
        totalRecords: 200,
        processedRecords: 200,
        failedRecords: 0,
      });
    }, 2000);
  };

  const calculateProgress = (operation: any) => {
    if (operation.totalRecords === 0) return 0;
    return (operation.processedRecords / operation.totalRecords) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Import/Export Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Import Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              {t('bulk.import')}
            </CardTitle>
            <CardDescription>{t('bulk.importDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {selectedFile ? selectedFile.name : t('bulk.dragAndDrop')}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{t('bulk.supportedFormats')}</p>
              </label>
            </div>
            <Button onClick={handleImport} disabled={!selectedFile} className="w-full">
              {t('bulk.startImport')}
            </Button>
          </CardContent>
        </Card>

        {/* Export Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              {t('bulk.export')}
            </CardTitle>
            <CardDescription>{t('bulk.exportDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">{t('bulk.exportOptions')}</div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">{t('bulk.includeProductDetails')}</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">{t('bulk.includeStockMovements')}</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">{t('bulk.includeAdjustments')}</span>
                </label>
              </div>
            </div>
            <Button onClick={handleExport} className="w-full">
              {t('bulk.startExport')}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Operations History */}
      <Card>
        <CardHeader>
          <CardTitle>{t('bulk.operationsHistory')}</CardTitle>
          <CardDescription>{t('bulk.operationsDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('bulk.columns.date')}</TableHead>
                  <TableHead>{t('bulk.columns.type')}</TableHead>
                  <TableHead>{t('bulk.columns.file')}</TableHead>
                  <TableHead>{t('bulk.columns.status')}</TableHead>
                  <TableHead>{t('bulk.columns.progress')}</TableHead>
                  <TableHead>{t('bulk.columns.results')}</TableHead>
                  <TableHead>{t('bulk.columns.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bulkOperations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">{t('bulk.noOperations')}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  bulkOperations.map((operation) => (
                    <TableRow key={operation.id}>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(operation.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(operation.createdAt).toLocaleTimeString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(operation.type)}
                          <span className="text-sm font-medium">
                            {t(`bulk.type.${operation.type}`)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{operation.fileName}</div>
                        <div className="text-xs text-muted-foreground">{operation.createdBy}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(operation.status)}
                          <Badge className={getStatusColor(operation.status)}>
                            {t(`bulk.status.${operation.status}`)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <Progress value={calculateProgress(operation)} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            {operation.processedRecords} / {operation.totalRecords}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="text-green-600">
                            {t('bulk.processed', { count: operation.processedRecords })}
                          </div>
                          {operation.failedRecords > 0 && (
                            <div className="text-red-600">
                              {t('bulk.failed', { count: operation.failedRecords })}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {operation.status === 'completed' && (
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          {operation.status === 'failed' && (
                            <Button variant="ghost" size="sm">
                              <AlertTriangle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
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
