'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Farm } from "./types";

interface ProductionForecastProps {
  farm: Farm;
}

export function ProductionForecast({ farm }: ProductionForecastProps) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Harvest Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {farm.activeCrops.map((crop) => (
            <div key={crop.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{crop.name}</span>
              </div>
              <div className="grid grid-cols-12 gap-1">
                {months.map((month) => (
                  <div
                    key={month}
                    className="h-2 rounded bg-gray-200"
                  />
                ))}
              </div>
              <div className="grid grid-cols-12 gap-1 text-xs text-gray-500">
                {months.map((month) => (
                  <div key={month} className="text-center">
                    {month}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}