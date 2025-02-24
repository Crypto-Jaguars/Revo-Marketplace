'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crop, Equipment } from "./types";
import { WrenchIcon, CheckCircleIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface CropTimelineProps {
  totalAcreage: number;
  crops: Crop[];
  equipment: Equipment[];
  certifications: { name: string; status: string; }[];
}

export function CropTimeline({ totalAcreage, crops, equipment, certifications }: CropTimelineProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-emerald-500';
      case 'maintenance':
        return 'text-amber-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Active Crops Card */}
      <Card>
        <CardHeader>
          <CardTitle>Active Crops</CardTitle>
          <p className="text-sm text-muted-foreground">Current growing status</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {crops.map((crop) => (
              <div key={crop.name} className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span>{crop.name}</span>
                    <span className="text-muted-foreground">{crop.status}</span>
                  </div>
                  <span>{crop.acreage} acres</span>
                </div>
                <Progress value={(crop.acreage / totalAcreage) * 100} />
                <div className="flex">
                  <span className="text-xs text-emerald-600">good</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Equipment Status Card */}
      <Card>
        <CardHeader>
          <CardTitle>Equipment Status</CardTitle>
          <p className="text-sm text-muted-foreground">Currently deployed machinery</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {equipment.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <WrenchIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className={`text-sm ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications Card */}
      <Card>
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
          <p className="text-sm text-muted-foreground">Quality and compliance</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{cert.name}</span>
                </div>
                <span className="text-sm text-emerald-500">
                  {cert.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}