"use client";

import React from 'react';
import { Award, Leaf, Medal } from 'lucide-react';

const CertificationCards = ({ isOwner = false }) => {
  const certifications = [
    {
      id: 1,
      name: "Certificación Orgánica",
      issuer: "EcoAgro Cert",
      validUntil: "2024-12-31",
      status: "Vigente",
      icon: "star"
    },
    {
      id: 2,
      name: "Comercio Justo",
      issuer: "Fair Trade",
      validUntil: "2024-12-31",
      status: "Vigente",
      icon: "medal"
    },
    {
      id: 3,
      name: "Producción Sostenible",
      issuer: "Green Cert",
      validUntil: "2024-12-31",
      status: "Vigente",
      icon: "leaf"
    }
  ];

  const getIcon = (iconType: string) => {
    const iconProps = {
      className: "w-8 h-8 text-filter_active stroke-2",
      fill: "none"
    };

    switch (iconType) {
      case 'star':
        return <Award {...iconProps} />;
      case 'medal':
        return <Medal {...iconProps} />;
      case 'leaf':
        return <Leaf {...iconProps} />;
      default:
        return <Award {...iconProps} />;
    }
  };

  return (
    <section className="bg-white p-6 mb-8 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Certificaciones</h2>
        {isOwner && (
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
            <Award size={16} />
            Agregar Certificación
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <div key={cert.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                {getIcon(cert.icon)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.name}</h3>
              <p className="text-sm text-gray-600 mb-1">Emisor: {cert.issuer}</p>
              <p className="text-sm text-gray-500">Válido hasta: {cert.validUntil}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CertificationCards;