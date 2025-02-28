'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";

interface HarvestData {
  month: string;
  progress: number;
  forecast: number;
}

interface ProductionForecastProps {
  crops: Array<{
    id: string;
    name: string;
    harvest: HarvestData[];
  }>;
}

export default function ProductionForecast({ crops }: ProductionForecastProps) {
  const t = useTranslations('Farm.production');

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl md:text-2xl">{t('forecast.title')}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="min-w-[768px]">
          <div className="space-y-8">
            {crops.map((crop) => (
              <div key={crop.id} className="space-y-2">
                <h3 className="font-medium">{crop.name}</h3>
                <div className="space-y-4">
                  {crop.harvest.map((harvestData) => (
                    <div key={harvestData.month} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{t('month', { month: harvestData.month })}</span>
                        <span>{t('forecast.progress', { value: harvestData.progress })}</span>
                      </div>
                      <Progress 
                        value={harvestData.progress} 
                        className="h-4" 
                        aria-label={t('forecast.progressLabel', { crop: crop.name, month: harvestData.month })}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={harvestData.progress}
                        aria-valuetext={t('forecast.progressText', {
                          crop: crop.name,
                          month: harvestData.month,
                          progress: harvestData.progress,
                          forecast: harvestData.forecast
                        })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}