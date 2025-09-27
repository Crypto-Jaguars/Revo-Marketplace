"use client";

import React, { memo, useCallback } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface ProfileHeaderProps {
  isOwner?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ isOwner = false }) => {
  const handleContactClick = useCallback(() => {
    // TODO: Implement contact functionality
    console.log('Contact farmer clicked');
  }, []);

  return (
    <div className="relative">
      {/* Background Image with Gradient Overlay */}
      <div className="h-48 sm:h-56 md:h-64 relative overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200&h=400&fit=crop"
          alt="Farm landscape"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Profile Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Profile Picture */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white shadow-lg mb-2 relative">
                <Image 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                  alt="Farmer profile"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Profile Info */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-white">
                  Granja Orgánica El Paraíso
                </h1>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  {/* Rating */}
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold text-white">4.9</span>
                    <span className="ml-1 text-white">(128 reseñas)</span>
                  </div>
                  
                  {/* Badges Container */}
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-600 px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-white">
                      Certificado Orgánico
                    </span>
                    <span className="bg-blue-600 px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-white">
                      Venta Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Button */}
            <button 
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors shadow-lg text-sm sm:text-base text-white"
              onClick={handleContactClick}
              aria-label="Contactar al agricultor"
            >
              Contactar Agricultor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProfileHeader);