'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Farm } from "./types";
import { CropTimeline } from "./CropTimeline";
import { ContractHistory } from "./ContractHistory";
import { EnvironmentalMetrics } from "./EnvironmentalMetrics";
import { ProductionForecast } from "./ProductionForecast";
import Breadcrumb from "@/components/shared/Breadcrumb";
interface FarmDetailViewProps {
  farm: Farm;
}

export function FarmDetailView({ farm }: FarmDetailViewProps) {

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Farms', href: '/farms' },
    { label: farm.name, href: '', isCurrent: true }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      {/* Header */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Acreage */}
          <Card>
            <CardHeader>
              <CardTitle>Total Acreage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{farm.totalAcreage} acres</div>
              <Progress value={(farm.activeAcreage / farm.totalAcreage) * 100} className="mt-2" />
              <p className="text-sm text-muted-foreground mt-1">
                {farm.activeAcreage} acres active
              </p>
            </CardContent>
          </Card>

          {/* Labor Force */}
          <Card>
            <CardHeader>
              <CardTitle>Labor Force</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{farm.laborForce}</div>
              <p className="text-sm text-muted-foreground">Active Workers</p>
            </CardContent>
          </Card>

          {/* Climate & Conditions */}
          <Card>
            <CardHeader>
              <CardTitle>Climate & Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Average Temperature</span>
                  <span>{farm.climate.averageTemperature}°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Rainfall</span>
                  <span>{farm.climate.annualRainfall}mm</span>
                </div>
                <div className="flex justify-between">
                  <span>Growing Season</span>
                  <span>{farm.climate.growingSeason} days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="operations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="operations">Current Operations</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="environmental">Environmental Impact</TabsTrigger>
          <TabsTrigger value="forecast">Production Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="operations">
          <CropTimeline 
            totalAcreage={farm.totalAcreage}
            crops={farm.activeCrops} 
            equipment={farm.equipment}
            certifications={farm.certifications}
          />
        </TabsContent>

        <TabsContent value="contracts">
          <ContractHistory contracts={farm.contracts} />
        </TabsContent>

        <TabsContent value="environmental">
          <EnvironmentalMetrics metrics={farm.environmentalMetrics} />
        </TabsContent>

        <TabsContent value="forecast">
          <ProductionForecast farm={farm} />
        </TabsContent>
      </Tabs>
    </div>
  );
}