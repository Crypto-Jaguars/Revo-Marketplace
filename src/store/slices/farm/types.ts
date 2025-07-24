/**
 * Farm store types
 */
import {
  Crop,
  FarmCertification,
  FarmImage,
  FarmLocation,
  FarmingMethod,
  Infrastructure,
  SustainabilityMetrics,
} from '@/components/farm/types';

export interface FarmState {
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
  isLoading: boolean;
  error: string | null;
}

export interface FarmActions {
  setFarmData: (data: Partial<FarmState>) => void;
  updateLocation: (location: FarmLocation) => void;
  addCertification: (certification: FarmCertification) => void;
  removeCertification: (id: string) => void;
  updateCrop: (id: string, updates: Partial<Crop>) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}
