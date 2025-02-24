'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { FarmDetailsProps } from './types';
import { Badge } from '@/components/ui/badge';

export default function FarmDetails({
  farmingMethods,
  infrastructure,
}: FarmDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Farming Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Farming Methods</CardTitle>
          <CardDescription>
            Our sustainable farming practices and techniques
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {farmingMethods.map((method) => (
              <div key={method.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{method.type}</h4>
                  <Badge variant="outline">
                    Score: {method.sustainabilityScore}/10
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
                <Progress value={method.sustainabilityScore * 10} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Infrastructure */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Equipment */}
        <Card>
          <CardHeader>
            <CardTitle>Equipment</CardTitle>
            <CardDescription>Farm machinery and tools</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {infrastructure.equipment.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === 'operational'
                            ? 'success'
                            : item.status === 'maintenance'
                            ? 'warning'
                            : 'destructive'
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Storage Facilities */}
        <Card>
          <CardHeader>
            <CardTitle>Storage Facilities</CardTitle>
            <CardDescription>Storage capacity and utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Utilization</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {infrastructure.storage.map((facility) => (
                  <TableRow key={facility.type}>
                    <TableCell>{facility.type}</TableCell>
                    <TableCell>
                      {facility.capacity} {facility.unit}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress value={facility.currentUtilization} />
                        <p className="text-xs text-muted-foreground">
                          {facility.currentUtilization}%
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Processing Facilities */}
      <Card>
        <CardHeader>
          <CardTitle>Processing Facilities</CardTitle>
          <CardDescription>
            Our processing and production capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {infrastructure.processing.map((facility) => (
              <div key={facility.facility} className="space-y-2">
                <h4 className="font-medium">{facility.facility}</h4>
                <p className="text-sm text-muted-foreground">
                  Capacity: {facility.capacity} units
                </p>
                <div className="flex flex-wrap gap-2">
                  {facility.capabilities.map((capability) => (
                    <Badge key={capability} variant="outline">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 