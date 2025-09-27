export interface Producer {
  id: string;
  name: string;
  farmName: string;
  location: string;
  distance: number;
  image: string;
  rating: number;
  reviews: number;
  products: number;
  certifications: string[];
  description: string;
  farmingMethod: 'Organic' | 'Sustainable' | 'Traditional';
  establishedYear: number;
  farmSize: string;
  specialties: string[];
}