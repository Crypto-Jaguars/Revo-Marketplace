'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Farm } from "./types";
import { CropTimeline } from "./CropTimeline";
import { ContractHistory } from "./ContractHistory";
import EnvironmentalMetrics from "./EnvironmentalMetrics";
import ProductionForecast from "./ProductionForecast";
import { Users, ThermometerSun, Droplet, Trees } from "lucide-react";
import { useTranslations } from 'next-intl';
import Breadcrumb from "@/components/shared/Breadcrumb";

interface FarmDetailViewProps {
  farm: Farm;
}

export function FarmDetailView({ farm }: FarmDetailViewProps) {
  const t = useTranslations('Farm.detail');
  const tDetail = useTranslations('farm.detail');
  const breadcrumbItems = [
    { label: t('breadcrumb.home'), href: '/' },
    { label: t('breadcrumb.farms'), href: '/farms' },
    { label: farm.name, href: '', isCurrent: true }
  ];

  // Transform the metrics data to match the new interface
  const environmentalMetrics = {
    carbonFootprint: {
      current: farm.environmentalMetrics.carbonFootprint,
      target: 100 // Set appropriate target values
    },
    waterUsage: {
      current: farm.environmentalMetrics.waterUsage,
      target: 1000 // Set appropriate target values
    },
    biodiversity: {
      current: farm.environmentalMetrics.biodiversityScore,
      target: 100 // Set appropriate target values
    }
  };

  // Transform the farm data for production forecast
  const productionData = {
    crops: farm.activeCrops.map(crop => ({
      id: crop.id,
      name: crop.name,
      harvest: [
        // Add appropriate harvest data
        {
          month: new Date(crop.expectedHarvestDate).toLocaleString('default', { month: 'short' }),
          progress: 75, // Calculate appropriate progress
          forecast: 100 // Set appropriate forecast
        }
      ]
    }))
  };

  return (
    <div className="w-full min-h-screen bg-background pt-16 pb-48">
      <div className="container mx-auto p-4 space-y-6">
      <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
            {/* Total Acreage */}
            <Card className="w-full h-2/3">
              <CardHeader>
                <CardTitle>{tDetail('firstSection.title')}</CardTitle>
                <CardDescription>{tDetail('firstSection.description')}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{tDetail('firstSection.activeAcreage')}</h4>
                      <span className="text-sm text-muted-foreground">
                        {tDetail('firstSection.acreageValue', {
                          active: farm.activeAcreage,
                          total: farm.totalAcreage
                        })}
                      </span>
                    </div>
                    <Progress 
                      value={(farm.activeAcreage / farm.totalAcreage) * 100} 
                      className="h-4"
                      aria-label={tDetail('firstSection.activeProgress')}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={(farm.activeAcreage / farm.totalAcreage) * 100}
                      aria-valuetext={tDetail('firstSection.activeProgressText', {
                        percentage: Math.round((farm.activeAcreage / farm.totalAcreage) * 100)
                      })}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {farm.activeAcreage} {tDetail('firstSection.acresActive')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Labor Force */}
            <Card className="w-full h-2/3">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold">{tDetail('secondSection.laborForce')}</h3>
                  <span className="text-2xl font-bold">{farm.laborForce} {tDetail('secondSection.unit')}</span>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{tDetail('secondSection.activeWorkers')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Climate & Conditions */}
            <Card className="w-full sm:col-span-2 lg:col-span-1">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold">{tDetail('thirdSection.climate')}</h3>
                <p className="text-sm text-muted-foreground">
                  {tDetail('thirdSection.subtitle')}
                </p>
                <div className="space-y-3 my-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ThermometerSun className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{tDetail('thirdSection.temperature.title')}</span>
                    </div>
                    <span className="font-medium">{farm.climate.averageTemperature} {tDetail('thirdSection.temperature.unit')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Droplet className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{tDetail('thirdSection.rainfall.title')}</span>
                    </div>
                    <span className="font-medium">{farm.climate.annualRainfall} {tDetail('thirdSection.rainfall.unit')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Trees className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{tDetail('thirdSection.growingSeason.title')}</span>
                    </div>
                    <span className="font-medium">{farm.climate.growingSeason} {tDetail('thirdSection.growingSeason.unit')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="space-y-4">
          <Tabs defaultValue="operations" className="w-full">
            <div className="border-b">
              <TabsList className="h-12">
                <TabsTrigger value="operations" className="text-sm">
                  {t('operations')}
                </TabsTrigger>
                <TabsTrigger value="contracts" className="text-sm">
                  {t('contracts')}
                </TabsTrigger>
                <TabsTrigger value="environmental" className="text-sm">
                  {t('environmental')}
                </TabsTrigger>
                <TabsTrigger value="forecast" className="text-sm">
                  {t('forecast')}
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="mt-6">
              <TabsContent value="operations" className="m-0">
                <CropTimeline
                  totalAcreage={farm.totalAcreage}
                  crops={farm.activeCrops}
                  equipment={farm.equipment}
                  certifications={farm.certifications}
                />
              </TabsContent>

              <TabsContent value="contracts" className="m-0">
                <ContractHistory contracts={farm.contracts} />
              </TabsContent>

              <TabsContent value="environmental" className="m-0">
                <EnvironmentalMetrics metrics={environmentalMetrics} />
              </TabsContent>

              <TabsContent value="forecast" className="m-0">
                <ProductionForecast crops={productionData.crops} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}