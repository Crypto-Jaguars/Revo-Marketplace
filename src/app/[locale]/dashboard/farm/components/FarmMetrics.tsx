'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FarmMetricsProps } from './types';
import { formatDate } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export default function FarmMetrics({
  crops,
  sustainabilityMetrics,
  ariaLabel = 'Farm metrics',
  ariaLive = 'polite',
}: FarmMetricsProps) {
  const t = useTranslations('Farm.metrics');

  return (
    <div className="space-y-6">
      {/* Active Crops */}
      <Card>
        <CardHeader>
          <CardTitle>{t('crop.title')}</CardTitle>
          <CardDescription>{t('crop.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('crop.table.crop')}</TableHead>
                <TableHead>{t('crop.table.status')}</TableHead>
                <TableHead>{t('crop.table.plantingDate')}</TableHead>
                <TableHead>{t('crop.table.expectedHarvest')}</TableHead>
                <TableHead>{t('crop.table.quantity')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crops.map((crop) => (
                <TableRow key={crop.id}>
                  <TableCell className="font-medium">{crop.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        crop.status === 'active'
                          ? 'success'
                          : crop.status === 'planned'
                            ? 'secondary'
                            : 'default'
                      }
                    >
                      {t(`crop.status.${crop.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(crop.plantingDate)}</TableCell>
                  <TableCell>{formatDate(crop.expectedHarvestDate)}</TableCell>
                  <TableCell>
                    {t('crop.quantity', { value: crop.quantity, unit: crop.unit })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Sustainability Metrics */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Resource Usage */}
        <Card>
          <CardHeader>
            <CardTitle>{t('resource.title')}</CardTitle>
            <CardDescription>{t('resource.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Water Usage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{t('resource.waterUsage.title')}</p>
                  <p className="text-sm text-muted-foreground">
                    {t('resource.waterUsage.description')}
                  </p>
                </div>
                <span className="text-sm font-medium">
                  {t('resource.percentage', { value: sustainabilityMetrics.waterUsage.percentage })}
                </span>
              </div>
              <Progress
                value={sustainabilityMetrics.waterUsage.percentage || 0}
                aria-label={t('resource.waterUsage.ariaLabel')}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={sustainabilityMetrics.waterUsage.percentage || 0}
              />
            </div>

            {/* Renewable Energy */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{t('resource.renewableEnergy.title')}</h4>
                <span className="text-sm text-muted-foreground">
                  {t('resource.renewableEnergy.usage', {
                    percentage: sustainabilityMetrics.renewableEnergy.percentage,
                  })}
                </span>
              </div>
              <Progress
                value={sustainabilityMetrics.renewableEnergy.percentage}
                aria-label={t('resource.renewableEnergy.ariaLabel')}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={sustainabilityMetrics.renewableEnergy.percentage}
              />
              <div className="flex flex-wrap gap-2">
                {sustainabilityMetrics.renewableEnergy.sources.map((source) => (
                  <Badge key={source} variant="outline">
                    {t(`resource.renewableEnergy.sources.${source}`)}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Impact */}
        <Card>
          <CardHeader>
            <CardTitle>{t('environmental.title')}</CardTitle>
            <CardDescription>{t('environmental.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Carbon Footprint */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{t('environmental.carbonFootprint.title')}</p>
                  <p className="text-sm text-muted-foreground">
                    {t('environmental.carbonFootprint.description')}
                  </p>
                </div>
                <span className="text-sm font-medium">
                  {t('environmental.percentage', {
                    value: sustainabilityMetrics.carbonFootprint.percentage,
                  })}
                </span>
              </div>
              <Progress
                value={sustainabilityMetrics.carbonFootprint.percentage || 0}
                aria-label={t('environmental.carbonFootprint.ariaLabel')}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={sustainabilityMetrics.carbonFootprint.percentage || 0}
              />
            </div>

            {/* Waste Management */}
            <div className="space-y-4">
              <h4 className="font-medium">{t('environmental.wasteManagement.title')}</h4>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {t('environmental.wasteManagement.recycling.title')}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {t('environmental.percentage', {
                        value: sustainabilityMetrics.wasteManagement.recyclingRate,
                      })}
                    </span>
                  </div>
                  <Progress
                    value={sustainabilityMetrics.wasteManagement.recyclingRate}
                    aria-label={t('environmental.wasteManagement.recycling.ariaLabel')}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={sustainabilityMetrics.wasteManagement.recyclingRate}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {t('environmental.wasteManagement.composting.title')}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {t('environmental.percentage', {
                        value: sustainabilityMetrics.wasteManagement.compostingRate,
                      })}
                    </span>
                  </div>
                  <Progress
                    value={sustainabilityMetrics.wasteManagement.compostingRate}
                    aria-label={t('environmental.wasteManagement.composting.ariaLabel')}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={sustainabilityMetrics.wasteManagement.compostingRate}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {sustainabilityMetrics.wasteManagement.methods.map((method) => (
                  <Badge key={method} variant="outline">
                    {t(`environmental.wasteManagement.methods.${method}`)}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
