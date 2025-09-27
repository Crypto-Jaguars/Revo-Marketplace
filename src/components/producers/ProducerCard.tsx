'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star, MapPin, Leaf, Users } from 'lucide-react';
import { Producer } from '@/types/producer';

interface ProducerCardProps {
  producer: Producer;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

export function ProducerCard({ producer, viewMode, onClick }: ProducerCardProps) {
  const t = useTranslations('Producers');
  const locale = useLocale();
  
  const formatDistance = (distance: number) => {
    return locale === 'es' 
      ? `${distance} km de distancia`
      : `${distance} km away`;
  };

  if (viewMode === 'list') {
    return (
      <Card 
        className="cursor-pointer hover:shadow-lg transition-all duration-200 border-0 bg-white shadow-md hover:shadow-xl"
        onClick={onClick}
      >
        <div className="flex">
          {/* Image */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 relative flex-shrink-0">
            <Image
              src={producer.image || '/images/fallback-farm.svg'}
              alt={producer.name}
              fill
              className="object-cover rounded-l-lg"
              sizes="(max-width: 640px) 96px, 128px"
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1">
                  {producer.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{producer.farmName}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{producer.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{formatDistance(producer.distance)}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {producer.certifications.map((cert) => (
                    <Badge 
                      key={cert} 
                      variant="secondary" 
                      className="text-xs bg-green-100 text-green-800"
                    >
                      {cert === 'organic' ? t('producerCard.organic') : 
                       cert === 'fair-trade' ? t('producerCard.fairTrade') : cert}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-sm">{producer.rating}</span>
                  <span className="text-xs text-gray-500">
                    ({producer.reviews} {t('producerCard.reviews')})
                  </span>
                </div>
                <Button 
                  size="sm"
                  className="text-sm bg-green-600 hover:bg-green-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                  }}
                >
                  {t('producerCard.viewProfile')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 border-0 bg-white shadow-md hover:shadow-xl"
      onClick={onClick}
    >
      <div className="relative">
        {/* Image */}
        <div className="relative w-full h-48 sm:h-56">
          <Image
            src={producer.image || '/images/fallback-farm.svg'}
            alt={producer.name}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">{producer.rating}</span>
          </div>
        </div>

        <CardContent className="p-4 sm:p-6">
          {/* Header */}
          <div className="mb-3">
            <h3 className="font-semibold text-gray-900 text-lg mb-1">
              {producer.name}
            </h3>
            <p className="text-gray-600 text-sm">{producer.farmName}</p>
          </div>

          {/* Location & Distance */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{producer.location}</span>
            </div>
            <span>{formatDistance(producer.distance)}</span>
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap gap-1 mb-4">
            {producer.certifications.map((cert) => (
              <Badge 
                key={cert} 
                variant="secondary" 
                className="text-xs bg-green-100 text-green-800"
              >
                {cert === 'organic' ? t('producerCard.organic') : 
                 cert === 'fair-trade' ? t('producerCard.fairTrade') : cert}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{producer.products} {t('producerCard.products')}</span>
            </div>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>
                ({producer.reviews} {t('producerCard.reviews')})
              </span>
            </span>
          </div>
        </div>

        <CardFooter className="p-4 sm:p-4 pt-0">
          <Button 
            className="w-full text-sm bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            {t('producerCard.viewProfile')}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}