'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crop, Equipment } from './types';
import { Award, Tractor } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface CropTimelineProps {
  totalAcreage: number;
  crops: Crop[];
  equipment: Equipment[];
  certifications: { name: string; status: string }[];
}

const CROP_STATE = {
  GOOD: 'GOOD',
  FAIR: 'FAIR',
  POOR: 'POOR',
} as const;

type CropState = (typeof CROP_STATE)[keyof typeof CROP_STATE];

const EQUIPMENT_STATE = {
  ACTIVE: 'active',
  MAINTENANCE: 'maintenance',
  INACTIVE: 'inactive',
};

const CERTIFICATION_STATE = {
  ACTIVE: 'active',
  PENDING: 'pending',
  EXPIRED: 'expired',
};

export function CropTimeline({
  totalAcreage,
  crops,
  equipment,
  certifications,
}: CropTimelineProps) {
  const t = useTranslations('Farm.crops');
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case EQUIPMENT_STATE.ACTIVE:
        return 'text-emerald-500';
      case EQUIPMENT_STATE.MAINTENANCE:
        return 'text-amber-500';
      case EQUIPMENT_STATE.INACTIVE:
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusEquipmentLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case EQUIPMENT_STATE.ACTIVE:
        return t('equipment.status.active');
      case EQUIPMENT_STATE.MAINTENANCE:
        return t('equipment.status.maintenance');
      case EQUIPMENT_STATE.INACTIVE:
        return t('equipment.status.inactive');
      default:
        return t('equipment.status.inactive');
    }
  };

  const getStatusCropColor = (status: CropState) => {
    switch (status) {
      case CROP_STATE.GOOD:
        return 'text-emerald-500';
      case CROP_STATE.FAIR:
        return 'text-amber-500';
      case CROP_STATE.POOR:
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getCropState = (acreage: number) => {
    if (acreage > totalAcreage * 0.7) {
      return t('activeCrops.state.good');
    } else if (acreage > totalAcreage * 0.3) {
      return t('activeCrops.state.fair');
    } else {
      return t('activeCrops.state.poor');
    }
  };

  const getStatusCertificationLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case CERTIFICATION_STATE.ACTIVE:
        return t('certifications.status.active');
      case CERTIFICATION_STATE.PENDING:
        return t('certifications.status.pending');
      case CERTIFICATION_STATE.EXPIRED:
        return t('certifications.status.expired');
      default:
        return t('certifications.status.inactive');
    }
  };

  const getStatusCertificationColor = (status: string) => {
    switch (status.toLowerCase()) {
      case CERTIFICATION_STATE.ACTIVE:
        return 'text-emerald-500';
      case CERTIFICATION_STATE.PENDING:
        return 'text-amber-500';
      case CERTIFICATION_STATE.EXPIRED:
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl md:text-2xl">{t('activeCrops.title')}</CardTitle>
          <p className="text-sm text-muted-foreground">{t('activeCrops.subtitle')}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {crops.map((crop) => (
              <div key={crop.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{crop.name}</h3>
                    <p className={cn('text-sm', getStatusCropColor(crop.status as CropState))}>
                      {t(`status.${crop.status.toLowerCase()}`)}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {t('acreage', { value: crop.acreage, total: totalAcreage })}
                  </span>
                </div>
                <Progress
                  value={(crop.acreage / totalAcreage) * 100}
                  className="h-4"
                  aria-label={t('acreageProgress', { crop: crop.name })}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={(crop.acreage / totalAcreage) * 100}
                  aria-valuetext={t('acreageProgressText', {
                    crop: crop.name,
                    value: crop.acreage,
                    total: totalAcreage,
                    percentage: Math.round((crop.acreage / totalAcreage) * 100),
                  })}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl md:text-2xl">{t('equipment.title')}</CardTitle>
          <p className="text-sm text-muted-foreground">{t('equipment.subtitle')}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {equipment.map((item) => (
              <div
                key={item.name}
                className="flex flex-wrap items-center justify-between gap-2 py-1"
              >
                <div className="flex items-center gap-2 min-w-[150px]">
                  <Tractor className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className={`text-sm ${getStatusColor(item.status)} flex-shrink-0`}>
                  {getStatusEquipmentLabel(item.status)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full md:col-span-2 lg:col-span-1">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl md:text-2xl">{t('certifications.title')}</CardTitle>
          <p className="text-sm text-muted-foreground">{t('certifications.subtitle')}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex flex-wrap items-center justify-between gap-2 py-1"
              >
                <div className="flex items-center gap-2 min-w-[150px]">
                  <Award className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span className="text-sm">{cert.name}</span>
                </div>
                <span
                  className={`text-sm ${getStatusCertificationColor(cert.status)} flex-shrink-0`}
                >
                  {getStatusCertificationLabel(cert.status)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
