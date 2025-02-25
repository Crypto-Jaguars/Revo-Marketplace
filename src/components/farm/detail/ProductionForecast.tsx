'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Farm } from "./types";
import { useTranslations } from "next-intl";

interface ProductionForecastProps {
  farm: Farm;
}

interface CropHarvestData {
  [key: string]: { harvestMonth: string; progress: number };
}

export function ProductionForecast({ farm }: ProductionForecastProps) {
  const t = useTranslations('farm.forecast');
  const months = [t('months.january'), t('months.february'), t('months.march'), t('months.april'), t('months.may'), t('months.june'), t('months.july'), t('months.august'), t('months.september'), t('months.october'), t('months.november'), t('months.december')];
  
  const cropHarvestData : CropHarvestData = farm.activeCrops.reduce((acc, crop) => {
    const mockMonths = ['Jul', 'Aug', 'Sep'];
    const mockProgress = [58, 66, 75];
    const index = farm.activeCrops.indexOf(crop) % 3;
    return {
      ...acc,
      [crop.name]: {
        harvestMonth: mockMonths[index],
        progress: mockProgress[index]
      }
    };
    }, {});

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl md:text-2xl">{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="min-w-[768px]">
          <div className="grid grid-cols-12 text-xs text-muted-foreground mb-6">
            {months.map((month) => (
              <div key={month} className="text-center px-1">
                {month}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {farm.activeCrops.map((crop) => {
              const harvestData = cropHarvestData[crop.name as keyof typeof cropHarvestData] || { harvestMonth: 'N/A', progress: 0 };
              
              return (
                <div key={crop.name} className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <span className="font-medium text-sm md:text-base">{crop.name}</span>
                    <span className="text-xs md:text-sm text-muted-foreground">{harvestData?.harvestMonth}</span>
                  </div>
                  <Progress value={harvestData?.progress} className="h-4" />
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}