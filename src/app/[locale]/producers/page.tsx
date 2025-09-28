'use client';

import { useTranslations } from 'next-intl';
import Bounded from '@/components/Bounded';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Users, Leaf } from 'lucide-react';
import Image from 'next/image';

// Mock data for producers - in a real app this would come from an API
const mockProducers = [
  {
    id: '1',
    name: 'Green Valley Farms',
    location: 'California, USA',
    rating: 4.8,
    specialties: ['Organic Vegetables', 'Herbs'],
    image: '/farm-placeholder.jpg',
    description: 'Sustainable farming practices with over 20 years of experience',
    certifications: ['Organic', 'Fair Trade'],
    productCount: 25
  },
  {
    id: '2',
    name: 'Sunrise Organic Farm',
    location: 'Oregon, USA',
    rating: 4.9,
    specialties: ['Fruits', 'Berries'],
    image: '/farm-placeholder.jpg',
    description: 'Family-owned farm specializing in premium organic fruits',
    certifications: ['Organic', 'Biodynamic'],
    productCount: 18
  },
  {
    id: '3',
    name: 'Heritage Grains Co.',
    location: 'Kansas, USA',
    rating: 4.7,
    specialties: ['Grains', 'Seeds'],
    image: '/farm-placeholder.jpg',
    description: 'Ancient grain varieties and heirloom seeds',
    certifications: ['Non-GMO', 'Heirloom'],
    productCount: 32
  }
];

export default function ProducersPage() {
  const t = useTranslations();

  return (
    <Bounded>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Our Producers</h1>
          <p className="text-gray-300 text-lg">
            Meet our network of trusted farmers and producers committed to sustainable agriculture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducers.map((producer) => (
            <Card key={producer.id} className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={producer.image}
                  alt={producer.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-farm.jpg';
                  }}
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-600 text-white">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {producer.rating}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-gray-900">{producer.name}</CardTitle>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {producer.location}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm line-clamp-2">
                  {producer.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {producer.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {producer.certifications.map((cert) => (
                    <Badge key={cert} className="bg-green-100 text-green-800 text-xs">
                      <Leaf className="w-3 h-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    {producer.productCount} products
                  </div>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Interested in Joining Our Network?
          </h2>
          <p className="text-gray-300 mb-6">
            We're always looking for passionate farmers and producers to join our community
          </p>
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
          >
            Become a Producer
          </Button>
        </div>
      </div>
    </Bounded>
  );
}