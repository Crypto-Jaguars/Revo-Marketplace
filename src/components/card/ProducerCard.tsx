'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type Producer = {
  photo: string;
  marketName: string;
  farmerName: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  products: string[];
  certifications: { name: string; icon: JSX.Element }[];
};

interface ProducerCardProps {
  producer: Producer;
  onContact?: () => void;
  onViewDetails?: () => void;
}

export default function ProducerCard({ producer, onContact, onViewDetails }: ProducerCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row items-stretch',
        'rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden',
        'bg-gradient-to-br from-[#F5F7F5] via-[#E6EFE8] to-[#D8E8DE]'
      )}
    >
      {/* Image (fixed aspect square for consistency) */}
      <div className="relative w-full md:w-1/3 aspect-square md:aspect-auto">
        <Image
          src={producer.photo}
          alt={producer.marketName}
          unoptimized
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-3 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Market + Farmer */}
          <div>
            <h3 className="text-lg font-bold">{producer.marketName}</h3>
            <p className="text-sm opacity-80">Farmer: {producer.farmerName}</p>
          </div>

          {/* Location + Distance */}
          <div className="flex items-center justify-between">
            <span className="text-sm">{producer.location}</span>
            <Badge variant="secondary" className="bg-white text-emerald-700">
              {producer.distance}
            </Badge>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={cn(
                  i < Math.round(producer.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                )}
              />
            ))}
            <span className="text-sm ml-2">
              {producer.rating.toFixed(1)} ({producer.reviews} reviews)
            </span>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold">Main Products</h4>
            <p className="text-sm opacity-90 line-clamp-2">{producer.products.join(', ')}</p>
          </div>

          {/* Certifications */}
          {producer.certifications.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-1">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {producer.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1 text-xs bg-white/20 rounded-full px-2 py-1"
                  >
                    {cert.icon}
                    <span>{cert.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="secondary"
            className="bg-white text-emerald-700 hover:bg-gray-100"
            onClick={onContact}
          >
            Contact
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white/20"
            onClick={onViewDetails}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
