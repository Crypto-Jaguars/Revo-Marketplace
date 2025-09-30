'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Producer } from '@/types/producer';
import { MapPin, Star, Phone, Mail, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProducerCardProps {
  producer: Producer;
  onClick?: (producer: Producer) => void;
  className?: string;
}

export function ProducerCard({ producer, onClick, className }: ProducerCardProps) {
  const handleCardClick = () => {
    if (onClick) {
      onClick(producer);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <Card
      className={cn(
        'w-full max-w-sm mx-auto overflow-hidden',
        'transition-all duration-200 hover:scale-[1.02] hover:shadow-lg',
        'cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#375B42] focus:ring-offset-2',
        'bg-white border border-gray-200',
        className
      )}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${producer.name}'s farm details`}
    >
      {/* Producer Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={producer.image}
          alt={`${producer.name} - ${producer.farmName}`}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 384px) 100vw, 384px"
        />
        <div className="absolute top-3 left-3">
          <Badge 
            variant="outline" 
            className="bg-white/90 text-[#375B42] font-medium border-[#375B42]"
          >
            {producer.farmingMethod}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-md">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900">
              {producer.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Producer Info */}
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            {producer.name}
          </h3>
          <p className="text-[#375B42] font-medium">
            {producer.farmName}
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>{producer.location.city}, {producer.location.state}</span>
            <span className="mx-1">•</span>
            <span>{producer.location.distance}</span>
          </div>
        </div>
      </CardHeader>

      {/* Producer Details */}
      <CardContent className="pt-0 pb-4">
        <div className="space-y-3">
          <p className="text-sm text-gray-600 line-clamp-2">
            {producer.description}
          </p>
          
          {/* Specialties */}
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">SPECIALTIES</p>
            <div className="flex flex-wrap gap-1">
              {producer.specialties.slice(0, 3).map((specialty) => (
                <Badge
                  key={specialty}
                  variant="outline"
                  className="text-xs border-[#375B42] text-[#375B42]"
                >
                  {specialty}
                </Badge>
              ))}
              {producer.specialties.length > 3 && (
                <Badge variant="outline" className="text-xs border-gray-300 text-gray-500">
                  +{producer.specialties.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* Farm Info */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Est. {producer.establishedYear}</span>
            <span>{producer.farmSize}</span>
          </div>
        </div>
      </CardContent>

      {/* Contact Actions */}
      <CardFooter className="pt-0 pb-4">
        <div className="flex items-center gap-2 w-full">
          {producer.contactInfo.phone && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-[#375B42] text-[#375B42] hover:bg-[#375B42] hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`tel:${producer.contactInfo.phone}`, '_blank');
              }}
            >
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
          )}
          {producer.contactInfo.email && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-[#375B42] text-[#375B42] hover:bg-[#375B42] hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`mailto:${producer.contactInfo.email}`, '_blank');
              }}
            >
              <Mail className="h-3 w-3 mr-1" />
              Email
            </Button>
          )}
          {producer.contactInfo.website && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-[#375B42] text-[#375B42] hover:bg-[#375B42] hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                window.open(producer.contactInfo.website, '_blank');
              }}
            >
              <Globe className="h-3 w-3 mr-1" />
              Visit
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}