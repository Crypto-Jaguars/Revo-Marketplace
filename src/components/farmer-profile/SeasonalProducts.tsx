"use client";

import React from 'react';
import Image from 'next/image';
import { Calendar } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  season: string;
  availability: string;
  image: string;
}

interface SeasonalProductsProps {
  isOwner?: boolean;
  products: Product[];
}

const SeasonalProducts: React.FC<SeasonalProductsProps> = ({ isOwner = false, products }) => {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Disponible':
        return 'bg-green-100 text-green-800';
      case 'Temporada Alta':
        return 'bg-blue-100 text-blue-800';
      case 'Próximamente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleManageProducts = () => {
    // TODO: Implement product management functionality
    console.log('Manage products clicked');
  };

  return (
    <section className="bg-white p-6 mb-8 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Productos de Temporada</h2>
        {isOwner && (
          <button 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            onClick={handleManageProducts}
            aria-label="Gestionar productos de temporada"
          >
            <Calendar size={16} />
            Gestionar Productos
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                  <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{product.season}</span>
                </p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(product.availability)}`}>
                  {product.availability}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SeasonalProducts;