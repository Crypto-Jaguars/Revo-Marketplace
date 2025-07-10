'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FarmProfileProps } from './types';
import { MapPin, Calendar, Phone, Mail, Globe } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { useLocale } from 'next-intl';

const ContactLink = ({ href, icon: Icon, children }: {
  href: string;
  icon: typeof Phone;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-2">
    <Icon className="h-4 w-4 text-muted-foreground" />
    <a
      href={href}
      className="hover:text-primary transition-colors"
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  </div>
);

export default function FarmProfile({
  name,
  establishedDate,
  location,
  totalArea,
  contactInfo,
  images,
}: FarmProfileProps) {
  const locale = useLocale();
  const formattedDate = useMemo(() => formatDate(establishedDate, locale), [establishedDate, locale]);

  // Memoize formatted address
  const formattedAddress = useMemo(() => {
    return `${location.address}, ${location.city}, ${location.state}, ${location.country}`;
  }, [location]);

  // Memoize formatted area
  const formattedArea = useMemo(() => {
    return `${totalArea.value} ${totalArea.unit}`;
  }, [totalArea]);

  return (
    <div className="space-y-6">
      {/* Header with Farm Image */}
      <div className="relative h-48 w-full overflow-hidden rounded-lg md:h-64">
        {images.length > 0 && (
          <Image
            src={images[0].url}
            alt={images[0].alt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy02LjY2OjY2Njo2NjY2NjY2NjY2NjY2NjY2NjY2NjY2Njb/2wBDAR0XFx8dHx8dHx8dHx8dHx8dHx8dHx8dHx8dHx8dHx8dHx8dHx8dHx8dHx8dHx8dHx8dHx8dHx8dHx8dHx//wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            onError={(e) => {
              // Replace with fallback image if loading fails
              (e.target as HTMLImageElement).src = '/images/fallback-farm.svg';
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-bold text-white md:text-3xl">{name}</h1>
        </div>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Farm Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{formattedAddress}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Established {formattedDate}</span>
          </div>
          <div className="mt-2">
            <Badge variant="outline">{formattedArea}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ContactLink href={`tel:${contactInfo.phone}`} icon={Phone}>
            {contactInfo.phone}
          </ContactLink>
          <ContactLink href={`mailto:${contactInfo.email}`} icon={Mail}>
            {contactInfo.email}
          </ContactLink>
          {contactInfo.website && (
            <ContactLink href={contactInfo.website} icon={Globe}>
              Visit Website
            </ContactLink>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 