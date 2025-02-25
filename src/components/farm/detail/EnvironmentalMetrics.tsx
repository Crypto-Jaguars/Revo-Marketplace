'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { EnvironmentalMetrics as Metrics } from "./types";
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
          <Progress value={progress} className="h-4" />
        )}
        <p className="text-sm text-muted-foreground mt-3">
          {t(`${translationKey}.description`)}
        </p>
      </CardContent>
    </Card>
  );
}

interface EnvironmentalMetricsProps {
  metrics: Metrics;
}

export function EnvironmentalMetrics({ metrics }: EnvironmentalMetricsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      <MetricCard
        translationKey="carbonFootprint"
        value={metrics.carbonFootprint}
        unit="t"
        progress={75}
      />

      <MetricCard
        translationKey="waterUsage"
        value={metrics.waterUsage}
        unit="kL"
        progress={60}
      />

      <MetricCard
        translationKey="biodiversity"
        value={metrics.biodiversityScore}
        unit="/100"
        progress={metrics.biodiversityScore}
        className="md:col-span-2 lg:col-span-1"
      />
    </div>
  );
}