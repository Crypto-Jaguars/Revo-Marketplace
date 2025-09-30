'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { FarmDetailsProps } from './types';
import { Badge } from '@/components/ui/badge';

export default function FarmDetails({
  farmingMethods,
  infrastructure,
  ariaLabel = 'Farm details',
  ariaLive = 'polite',
}: FarmDetailsProps) {
  const t = useTranslations('Farm.details');

  return (
    <div className="space-y-6">
      {/* Farming Methods */}
      <Card>
        <CardHeader>
          <CardTitle>{t('farmingMethods.title')}</CardTitle>
          <CardDescription>{t('farmingMethods.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {farmingMethods.map((method) => (
              <div
                key={method.type}
                role="region"
                aria-labelledby={`method-${method.type}`}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 id={`method-${method.type}`} className="font-medium">
                    {t(`farmingMethods.types.${method.type}`)}
                  </h4>
                  <Badge variant="outline">
                    {t('sustainabilityScore', { score: method.sustainabilityScore })}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t(`farmingMethods.descriptions.${method.type}`)}
                </p>
                <Progress
                  value={method.sustainabilityScore * 10}
                  aria-label={t('farmingMethods.sustainabilityAriaLabel', { type: method.type })}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={method.sustainabilityScore * 10}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Infrastructure */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Equipment */}
        <Card>
          <CardHeader>
            <CardTitle>{t('equipment.title')}</CardTitle>
            <CardDescription>{t('equipment.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('equipment.columns.name')}</TableHead>
                  <TableHead>{t('equipment.columns.quantity')}</TableHead>
                  <TableHead>{t('equipment.columns.status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {infrastructure.equipment.map((item) => (
                  <TableRow
                    key={item.name}
                    role="row"
                    tabIndex={0}
                    aria-label={t('equipment.itemAriaLabel', {
                      name: item.name,
                      quantity: item.quantity,
                      status: item.status,
                    })}
                  >
                    <TableCell>{t(`equipment.items.${item.name}`)}</TableCell>
                    <TableCell>{t('equipment.quantity', { value: item.quantity })}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === 'operational'
                            ? 'success'
                            : item.status === 'maintenance'
                              ? 'warning'
                              : 'destructive'
                        }
                        role="status"
                        aria-label={t('equipment.statusAriaLabel', { status: item.status })}
                      >
                        {t(`equipment.status.${item.status}`)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Storage Facilities */}
        <Card>
          <CardHeader>
            <CardTitle>{t('storage.title')}</CardTitle>
            <CardDescription>{t('storage.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('storage.columns.type')}</TableHead>
                  <TableHead>{t('storage.columns.capacity')}</TableHead>
                  <TableHead>{t('storage.columns.utilization')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {infrastructure.storage.map((facility) => (
                  <TableRow
                    key={facility.type}
                    role="row"
                    tabIndex={0}
                    aria-label={t('storage.facilityAriaLabel', {
                      type: facility.type,
                      capacity: facility.capacity,
                      unit: facility.unit,
                      utilization: facility.currentUtilization,
                    })}
                  >
                    <TableCell>{t(`storage.types.${facility.type}`)}</TableCell>
                    <TableCell>
                      {t('storage.capacity', { value: facility.capacity, unit: facility.unit })}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress
                          value={facility.currentUtilization}
                          aria-label={t('storage.utilizationAriaLabel', { type: facility.type })}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={facility.currentUtilization}
                        />
                        <p className="text-xs text-muted-foreground">
                          {t('storage.utilization', { value: facility.currentUtilization })}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Processing Facilities */}
      <Card>
        <CardHeader>
          <CardTitle>{t('processing.title')}</CardTitle>
          <CardDescription>{t('processing.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {infrastructure.processing.map((facility) => (
              <div key={facility.facility} className="space-y-2">
                <h4 className="font-medium">{t(`processing.facilities.${facility.facility}`)}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('processing.capacity', { value: facility.capacity })}
                </p>
                <div className="flex flex-wrap gap-2">
                  {facility.capabilities.map((capability) => (
                    <Badge key={capability} variant="outline">
                      {t(`processing.capabilities.${capability}`)}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
