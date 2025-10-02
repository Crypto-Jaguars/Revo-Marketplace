'use client';

import React, { useState, memo, useMemo } from 'react';
import dynamic from 'next/dynamic';
import ProfileHeader from '@/components/farmer-profile/ProfileHeader';
import AboutSection from '@/components/farmer-profile/AboutSection';
import PersonalInformationForm from '@/components/farmer-profile/PersonalInformationForm';

// Dynamic imports for non-critical components
const PhotoGallery = dynamic(() => import('@/components/farmer-profile/PhotoGallery'), {
  loading: () => <div className="bg-white p-6 mb-8 rounded-lg shadow-sm animate-pulse h-64" />
});

const CertificationCards = dynamic(() => import('@/components/farmer-profile/CertificationCards'), {
  loading: () => <div className="bg-white p-6 mb-8 rounded-lg shadow-sm animate-pulse h-48" />
});

const ContactInfo = dynamic(() => import('@/components/farmer-profile/ContactInfo'), {
  loading: () => <div className="bg-white p-6 mb-8 rounded-lg shadow-sm animate-pulse h-64" />
});

const SeasonalProducts = dynamic(() => import('@/components/farmer-profile/SeasonalProducts'), {
  loading: () => <div className="bg-white p-6 mb-8 rounded-lg shadow-sm animate-pulse h-48" />
});

interface FarmerProfileProps {
  params: {
    locale: string;
  };
}

// Default data for seasonal products - memoized
const defaultProducts = [
  {
    id: 1,
    name: 'Brócoli Tierno',
    season: 'Todo el año',
    availability: 'Disponible',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=150&h=150&fit=crop',
  },
  {
    id: 2,
    name: 'Lechugas Orgánicas',
    season: 'Noviembre - Mayo',
    availability: 'Disponible',
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=150&h=150&fit=crop',
  },
  {
    id: 3,
    name: 'Zanahorias',
    season: 'Diciembre - Abril',
    availability: 'Temporada Alta',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=150&h=150&fit=crop',
  },
  {
    id: 4,
    name: 'Brócoli',
    season: 'Enero - Marzo',
    availability: 'Próximamente',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=150&h=150&fit=crop',
  },
];

const FarmerProfile = memo<FarmerProfileProps>(({ params }) => {
  const [isOwner] = useState(true);

  const handlePersonalInfoSubmit = (data: any) => {
    console.log('Personal information submitted:', data);
    // TODO: Implement API call to save personal information
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader isOwner={isOwner} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contenido Principal */}
          <div className="flex-1 lg:w-2/3">
            <PersonalInformationForm 
              isOwner={isOwner} 
              onSubmit={handlePersonalInfoSubmit}
            />
            <AboutSection isOwner={isOwner} />
            <PhotoGallery isOwner={isOwner} />
            <CertificationCards isOwner={isOwner} />
          </div>

          {/* Sidebar Derecho */}
          <div className="lg:w-1/3 space-y-6">
            <div className="lg:sticky lg:top-8">
              <ContactInfo isOwner={isOwner} />
              <SeasonalProducts isOwner={isOwner} products={defaultProducts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

FarmerProfile.displayName = 'FarmerProfile';

export default FarmerProfile;
