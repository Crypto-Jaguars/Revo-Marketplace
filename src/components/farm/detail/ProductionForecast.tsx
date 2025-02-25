'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Farm } from "./types";
import { useTranslations } from "next-intl";

interface ProductionForecastProps {
  farm: Farm;
}

export function ProductionForecast({ farm }: ProductionForecastProps) {
  const t = useTranslations('farm.forecast');
  const months = [t('months.january'), t('months.february'), t('months.march'), t('months.april'), t('months.may'), t('months.june'), t('months.july'), t('months.august'), t('months.september'), t('months.october'), t('months.november'), t('months.december')];
  
  // Map crops to their harvest months (example data)
  const cropHarvestData = {
    'Corn': { harvestMonth: 'Aug', progress: 66 },
    'Soybeans': { harvestMonth: 'Sep', progress: 75 },
    'Wheat': { harvestMonth: 'Jul', progress: 58 }
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl md:text-2xl">{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="min-w-[768px]">
          {/* Months header */}
          <div className="grid grid-cols-12 text-xs text-muted-foreground mb-6">
            {months.map((month) => (
              <div key={month} className="text-center px-1">
                {month}
              </div>
            ))}
          </div>

          {/* Crops with progress bars */}
          <div className="space-y-6">
            {farm.activeCrops.map((crop) => {
              const harvestData = cropHarvestData[crop.name as keyof typeof cropHarvestData];
              
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