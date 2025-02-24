'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { EnvironmentalMetrics as Metrics } from "./types";

interface EnvironmentalMetricsProps {
  metrics: Metrics;
}

export function EnvironmentalMetrics({ metrics }: EnvironmentalMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Carbon Footprint</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{metrics.carbonFootprint}t</div>
          <Progress value={75} />
          <p className="text-sm text-muted-foreground mt-2">CO₂ equivalent per year</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Water Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{metrics.waterUsage}kL</div>
          <Progress value={60} />
          <p className="text-sm text-muted-foreground mt-2">Kiloliters per hectare</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Biodiversity Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{metrics.biodiversityScore}/100</div>
          <Progress value={metrics.biodiversityScore} />
          <p className="text-sm text-muted-foreground mt-2">Based on species diversity</p>
        </CardContent>
      </Card>
    </div>
  );
}