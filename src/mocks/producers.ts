import { Producer } from '@/types/producer';

export const producersMock: Producer[] = [
  {
    id: 'maria-gonzalez-001',
    name: 'María González',
    farmName: 'Los Naranjos Market',
    location: {
      city: 'Cartago',
      state: 'Costa Rica',
      distance: '12 km away'
    },
    image: '/images/sliderimage1.png',
    rating: 4.8,
    specialties: ['Organic Oranges', 'Citrus Fruits', 'Seasonal Vegetables'],
    description: 'Dedicated to organic citrus farming with over 15 years of experience. Specializes in premium oranges and seasonal vegetables using sustainable practices.',
    farmingMethod: 'Organic',
    certifications: ['USDA Organic', 'Fair Trade', 'Rainforest Alliance'],
    contactInfo: {
      phone: '+506 8888-1234',
      email: 'maria@losnaranjos.cr',
      website: 'https://losnaranjos.cr'
    },
    establishedYear: 2008,
    farmSize: '25 hectares'
  },
  {
    id: 'carlos-rodriguez-002',
    name: 'Carlos Rodríguez',
    farmName: 'Verde Esperanza Market',
    location: {
      city: 'Alajuela',
      state: 'Costa Rica',
      distance: '8 km away'
    },
    image: '/images/sliderimage2.png',
    rating: 4.7,
    specialties: ['Mixed Vegetables', 'Lettuce', 'Tomatoes', 'Bell Peppers'],
    description: 'Family-owned vegetable farm providing fresh, locally-grown produce. Known for exceptional lettuce and tomatoes with traditional farming methods.',
    farmingMethod: 'Traditional',
    certifications: ['GAP Certified', 'Local Organic'],
    contactInfo: {
      phone: '+506 8888-5678',
      email: 'carlos@verdeesperanza.cr'
    },
    establishedYear: 2010,
    farmSize: '18 hectares'
  },
  {
    id: 'ana-jimenez-003',
    name: 'Ana Jiménez',
    farmName: 'Dorado Market',
    location: {
      city: 'Heredia',
      state: 'Costa Rica',
      distance: '15 km away'
    },
    image: '/images/sliderimage3.png',
    rating: 4.9,
    specialties: ['Organic Honey', 'Bee Products', 'Medicinal Herbs'],
    description: 'Specialized beekeeper and herb grower with a passion for natural products. Produces premium honey and cultivates medicinal herbs using organic methods.',
    farmingMethod: 'Organic',
    certifications: ['Certified Organic', 'Bee Welfare Certified', 'Herbal Medicine Association'],
    contactInfo: {
      phone: '+506 8888-9012',
      email: 'ana@doradomarketcr.com',
      website: 'https://doradomarketcr.com'
    },
    establishedYear: 2012,
    farmSize: '12 hectares'
  },
  {
    id: 'roberto-jimenez-004',
    name: 'Roberto Jiménez',
    farmName: 'Jiménez Family Market',
    location: {
      city: 'San José',
      state: 'Costa Rica',
      distance: '20 km away'
    },
    image: '/images/tomatoes.jpg',
    rating: 4.6,
    specialties: ['Fresh Herbs', 'Spices', 'Aromatic Plants', 'Culinary Herbs'],
    description: 'Third-generation herb farmer specializing in culinary and aromatic herbs. Supplies restaurants and markets with fresh, high-quality herbs year-round.',
    farmingMethod: 'Sustainable',
    certifications: ['Sustainable Agriculture', 'Culinary Herb Specialist'],
    contactInfo: {
      phone: '+506 8888-3456',
      email: 'roberto@jimenezfamily.cr'
    },
    establishedYear: 1995,
    farmSize: '8 hectares'
  },
  {
    id: 'elena-vargas-005',
    name: 'Elena Vargas',
    farmName: 'Tropical Sunrise Market',
    location: {
      city: 'Puntarenas',
      state: 'Costa Rica',
      distance: '35 km away'
    },
    image: '/images/eggs.jpg',
    rating: 4.8,
    specialties: ['Tropical Pineapples', 'Exotic Fruits', 'Coconuts', 'Mangoes'],
    description: 'Tropical fruit specialist growing premium pineapples and exotic fruits. Located in the coastal region, perfect for tropical cultivation.',
    farmingMethod: 'Sustainable',
    certifications: ['Rainforest Alliance', 'Tropical Fruit Association', 'Export Quality'],
    contactInfo: {
      phone: '+506 8888-7890',
      email: 'elena@tropicalsunrise.cr',
      website: 'https://tropicalsunrise.cr'
    },
    establishedYear: 2005,
    farmSize: '40 hectares'
  },
  {
    id: 'diego-morales-006',
    name: 'Diego Morales',
    farmName: 'Montaña Verde Market',
    location: {
      city: 'Cartago',
      state: 'Costa Rica',
      distance: '18 km away'
    },
    image: '/images/sliderimage1.png',
    rating: 4.7,
    specialties: ['Mountain Berries', 'Strawberries', 'Blackberries', 'Coffee'],
    description: 'High-altitude berry farmer and coffee grower. Specializes in premium berries and artisanal coffee beans grown in mountain conditions.',
    farmingMethod: 'Organic',
    certifications: ['Organic Coffee', 'Berry Excellence', 'Mountain Grown'],
    contactInfo: {
      phone: '+506 8888-2345',
      email: 'diego@montanaverde.cr',
      website: 'https://montanaverde.cr'
    },
    establishedYear: 2007,
    farmSize: '22 hectares'
  }
];