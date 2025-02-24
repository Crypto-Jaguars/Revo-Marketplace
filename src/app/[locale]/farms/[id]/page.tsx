'use client';

import { FarmDetailView } from "@/components/farm/detail/FarmDetailView";
import { Farm } from '@/components/farm/detail/types';

// Mock data for demonstration
const mockFarm = {
  id: "1",
  name: "Green Valley Farm",
  totalAcreage: 500,
  activeAcreage: 450,
  laborForce: 25,
  climate: {
    averageTemperature: 15,
    annualRainfall: 900,
    growingSeason: 180
  },
  activeCrops: [
    { name: "Corn", acreage: 200, status: "Growing" },
    { name: "Soybeans", acreage: 150, status: "Ready to harvest" },
    { name: "Wheat", acreage: 100, status: "Winter wheat" }
  ],
  equipment: [
    { name: "John Deere Tractor", status: "active" },
    { name: "Combine Harvester", status: "maintenance" },
    { name: "Irrigation System", status: "active" }
  ],
  certifications: [
    { name: "Organic Certification", status: "active" },
    { name: "Sustainable Agriculture", status: "active" }
  ],
  contracts: [
    {
      client: "MegaFeed Corp",
      startDate: "2022-02-21",
      endDate: "2023-02-20",
      status: "active",
      value: 300000,
      completionRate: 75,
      satisfaction: 4
    },
    {
      client: "Local Grocers Co-op",
      startDate: "2021-02-21",
      endDate: "2022-02-20",
      status: "completed",
      value: 450000,
      completionRate: 100,
      satisfaction: 5
    }
  ],
  environmentalMetrics: {
    carbonFootprint: 75,
    waterUsage: 800,
    biodiversityScore: 85
  }
};

export default function FarmDetailPage() {
  return <FarmDetailView farm={mockFarm as Farm} />;
}