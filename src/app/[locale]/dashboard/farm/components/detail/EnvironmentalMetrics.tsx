'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Leaf } from "lucide-react";
import { useTranslations } from 'next-intl';

interface MetricCardProps {
  translationKey: string;
  value: string | number;
  unit?: string;
  progress?: number;
  className?: string;
}

function MetricCard({ 
  translationKey,
  value, 
  unit = "", 
  progress,
  className = "" 
}: MetricCardProps) {
  const t = useTranslations('farm.metrics');

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="flex flex-row justify-between items-center gap-2 px-6 pt-6 pb-1">
        <CardTitle className="text-md">{t(`${translationKey}.title`)}</CardTitle>
        <Leaf className="h-4 w-4 text-gray-500 flex-shrink-0" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">{value}{unit}</div>
        {progress !== undefined && (
          <Progress 
            value={progress} 
            className="h-4" 
            aria-label={t(`${translationKey}.progressLabel`)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-valuetext={`${progress}%`}
          />
        )}
        <p className="text-sm text-muted-foreground mt-3">
          {t(`${translationKey}.description`)}
        </p>
      </CardContent>
    </Card>
  );
}

interface EnvironmentalMetricsProps {
  metrics: {
    carbonFootprint: {
      current: number;
      target: number;
    };
    waterUsage: {
      current: number;
      target: number;
    };
    biodiversity: {
      current: number;
      target: number;
    };
  };
}

export default function EnvironmentalMetrics({ metrics }: EnvironmentalMetricsProps) {
  const t = useTranslations('Farm.environmental');

  const calculateProgress = (value: number, target: number) => {
    if (!target) return 0;
    return Math.max(0, Math.min(100, (1 - value / target) * 100));
  };

  const renderMetric = (
    translationKey: string,
    current: number,
    target: number,
    unit: string
  ) => {
    const progress = calculateProgress(current, target);

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{t(`${translationKey}.title`)}</h4>
          <span className="text-sm text-muted-foreground">
            {t(`${translationKey}.value`, { current, target, unit })}
          </span>
        </div>
        {progress !== undefined && (
          <Progress 
            value={progress} 
            className="h-4" 
            aria-label={t(`${translationKey}.progressLabel`)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-valuetext={`${progress}%`}
          />
        )}
        <p className="text-sm text-muted-foreground">
          {t(`${translationKey}.description`)}
        </p>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderMetric(
          'carbonFootprint',
          metrics.carbonFootprint.current,
          metrics.carbonFootprint.target,
          't/year'
        )}
        {renderMetric(
          'waterUsage',
          metrics.waterUsage.current,
          metrics.waterUsage.target,
          'm³/day'
        )}
        {renderMetric(
          'biodiversity',
          metrics.biodiversity.current,
          metrics.biodiversity.target,
          'species'
        )}
      </CardContent>
    </Card>
  );
}