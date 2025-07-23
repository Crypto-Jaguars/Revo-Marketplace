import { StaticImageData } from 'next/image';

export interface FarmLocation {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface FarmCertification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string; // ISO 8601 format (YYYY-MM-DD)
  expiryDate: string; // ISO 8601 format (YYYY-MM-DD)
  status: 'active' | 'expired' | 'pending';
  documentUrl?: string;
}

export interface FarmingMethod {
  type: string;
  description: string;
  sustainabilityScore: number;
}

export interface Crop {
  id: string;
  name: string;
  status: 'active' | 'planned' | 'harvested';
  plantingDate: string; // ISO 8601 format (YYYY-MM-DD)
  expectedHarvestDate: string; // ISO 8601 format (YYYY-MM-DD)
  actualHarvestDate?: string; // ISO 8601 format (YYYY-MM-DD)
  quantity: number;
  unit: string;
}

export interface Infrastructure {
  equipment: Array<{
    name: string;
    quantity: number;
    status: 'operational' | 'maintenance' | 'retired';
  }>;
  storage: Array<{
    type: string;
    capacity: number;
    unit: string;
    currentUtilization: number;
  }>;
  processing: Array<{
    facility: string;
    capacity: number;
    capabilities: string[];
  }>;
}

export interface SustainabilityMetrics {
  waterUsage: {
    amount: number;
    unit: string;
    period: string;
    percentage: number;
  };
  carbonFootprint: {
    amount: number;
    unit: string;
    period: string;
    percentage: number;
  };
  renewableEnergy: {
    percentage: number;
    sources: string[];
  };
  wasteManagement: {
    recyclingRate: number;
    compostingRate: number;
    methods: string[];
  };
}

export interface FarmImage {
  id: string;
  url: string | StaticImageData;
  alt: string;
  caption?: string;
}

export interface FarmProfileProps {
  id: string;
  name: string;
  establishedDate: string;
  location: FarmLocation;
  totalArea: {
    value: number;
    unit: string;
  };
  images: FarmImage[];
  certifications: FarmCertification[];
  farmingMethods: FarmingMethod[];
  activeCrops: Crop[];
  infrastructure: Infrastructure;
  sustainabilityMetrics: SustainabilityMetrics;
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  ariaLabel?: string;
  role?: string;
}

export interface FarmGalleryProps {
  images: FarmImage[];
  onImageClick?: (image: FarmImage) => void;
  ariaLabel?: string;
  role?: string;
}

export interface FarmDetailsProps {
  farmingMethods: FarmingMethod[];
  infrastructure: Infrastructure;
  ariaLabel?: string;
  role?: string;
}

export interface FarmMetricsProps {
  crops: Crop[];
  sustainabilityMetrics: SustainabilityMetrics;
  ariaLabel?: string;
  ariaLive?: 'polite' | 'assertive' | 'off';
}

export interface FarmCertificationsProps {
  certifications: FarmCertification[];
  ariaLabel?: string;
}
