export interface Climate {
  averageTemperature: number;
  annualRainfall: number;
  growingSeason: number;
}

export interface Crop {
  name: string;
  acreage: number;
  status: string;
}

export interface Equipment {
  name: string;
  status: 'active' | 'maintenance' | 'inactive';
}

export interface Contract {
  client: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
  value: number;
  completionRate: number;
  satisfaction: number;
}

export interface EnvironmentalMetrics {
  carbonFootprint: number;
  waterUsage: number;
  biodiversityScore: number;
}

export interface Farm {
  id: string;
  name: string;
  totalAcreage: number;
  activeAcreage: number;
  laborForce: number;
  climate: Climate;
  activeCrops: Crop[];
  equipment: Equipment[];
  certifications: {
    name: string;
    status: 'active' | 'pending' | 'expired';
  }[];
  contracts: Contract[];
  environmentalMetrics: EnvironmentalMetrics;
}