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

export default function FarmMetrics({ crops, sustainabilityMetrics }: FarmMetricsProps) {
  return (
    <div className="space-y-6">
      {/* Active Crops */}
      <Card>
        <CardHeader>
          <CardTitle>Crop Management</CardTitle>
          <CardDescription>Current and planned crop production</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Planting Date</TableHead>
                <TableHead>Expected Harvest</TableHead>
                <TableHead>Quantity</TableHead>
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
                      {crop.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(crop.plantingDate)}</TableCell>
                  <TableCell>{formatDate(crop.expectedHarvestDate)}</TableCell>
                  <TableCell>
                    {crop.quantity} {crop.unit}
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
            <CardTitle>Resource Usage</CardTitle>
            <CardDescription>Water and energy consumption</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Water Usage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Water Usage</h4>
                <span className="text-sm text-muted-foreground">
                  {sustainabilityMetrics.waterUsage.amount} {sustainabilityMetrics.waterUsage.unit}/
                  {sustainabilityMetrics.waterUsage.period}
                </span>
              </div>
              <Progress
                value={50}
                aria-label="Water usage progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={50}
              />
            </div>

            {/* Renewable Energy */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Renewable Energy</h4>
                <span className="text-sm text-muted-foreground">
                  {sustainabilityMetrics.renewableEnergy.percentage}% of total usage
                </span>
              </div>
              <Progress
                value={sustainabilityMetrics.renewableEnergy.percentage}
                aria-label="Renewable energy usage progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={sustainabilityMetrics.renewableEnergy.percentage}
              />
              <div className="flex flex-wrap gap-2">
                {sustainabilityMetrics.renewableEnergy.sources.map((source) => (
                  <Badge key={source} variant="outline">
                    {source}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Impact */}
        <Card>
          <CardHeader>
            <CardTitle>Environmental Impact</CardTitle>
            <CardDescription>Carbon footprint and waste management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Carbon Footprint */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Carbon Footprint</h4>
                <span className="text-sm text-muted-foreground">
                  {sustainabilityMetrics.carbonFootprint.amount}{' '}
                  {sustainabilityMetrics.carbonFootprint.unit}/
                  {sustainabilityMetrics.carbonFootprint.period}
                </span>
              </div>
              <Progress
                value={50}
                aria-label="Carbon footprint progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={50}
              />
            </div>

            {/* Waste Management */}
            <div className="space-y-4">
              <h4 className="font-medium">Waste Management</h4>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Recycling Rate</span>
                    <span className="text-sm text-muted-foreground">
                      {sustainabilityMetrics.wasteManagement.recyclingRate}%
                    </span>
                  </div>
                  <Progress
                    value={sustainabilityMetrics.wasteManagement.recyclingRate}
                    aria-label="Recycling rate progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={sustainabilityMetrics.wasteManagement.recyclingRate}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Composting Rate</span>
                    <span className="text-sm text-muted-foreground">
                      {sustainabilityMetrics.wasteManagement.compostingRate}%
                    </span>
                  </div>
                  <Progress
                    value={sustainabilityMetrics.wasteManagement.compostingRate}
                    aria-label="Composting rate progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={sustainabilityMetrics.wasteManagement.compostingRate}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {sustainabilityMetrics.wasteManagement.methods.map((method) => (
                  <Badge key={method} variant="outline">
                    {method}
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
