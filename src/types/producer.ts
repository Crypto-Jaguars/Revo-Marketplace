export interface Producer {
  id: string;
  name: string;
  farmName: string;
  location: {
    city: string;
    state: string;
    distance: string;
  };
  image: string;
  rating: number;
  specialties: string[];
  description: string;
  farmingMethod: 'Organic' | 'Sustainable' | 'Traditional';
  certifications: string[];
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
  };
  establishedYear: number;
  farmSize: string;
}