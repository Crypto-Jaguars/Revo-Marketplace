"use client";

import React, { useState } from 'react';
import ProfileHeader from '@/components/farmer-profile/ProfileHeader';
import AboutSection from '@/components/farmer-profile/AboutSection';
import PhotoGallery from '@/components/farmer-profile/PhotoGallery';
import CertificationCards from '@/components/farmer-profile/CertificationCards';
import SeasonalProducts from '@/components/farmer-profile/SeasonalProducts';
import ContactInfo from '@/components/farmer-profile/ContactInfo';

const FarmerProfile = () => {
  const [isOwner] = useState(false); // Cambiar a true para ver botones de edición

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader isOwner={isOwner} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contenido Principal */}
          <div className="flex-1 lg:w-2/3">
            <AboutSection isOwner={isOwner} />
            <PhotoGallery isOwner={isOwner} />
            <CertificationCards isOwner={isOwner} />
          </div>
          
          {/* Sidebar Derecho */}
          <div className="lg:w-1/3 space-y-6">
            <div className="lg:sticky lg:top-8">
              <ContactInfo isOwner={isOwner} />
              <SeasonalProducts isOwner={isOwner} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;