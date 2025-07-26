"use client";

import React, { useState } from 'react';
import { Edit3, Save, X } from 'lucide-react';

const AboutSection = ({ 
  isOwner = false, 
  initialData = {
    description: "Somos una granja familiar con más de 20 años de experiencia en agricultura orgánica. Nos especializamos en el cultivo de frutas y verduras de temporada, utilizando métodos sostenibles y respetuosos con el medio ambiente.",
    agricultureType: "Orgánica Certificada",
    farmSize: "15 Hectáreas",
    experience: "20+ Años"
  }
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [tempData, setTempData] = useState(initialData);

  const handleEdit = () => {
    setTempData(formData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setFormData(tempData);
    setIsEditing(false);
    console.log('Guardando datos:', tempData);
  };

  const handleCancel = () => {
    setTempData(formData);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof typeof tempData, value: string) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section className="bg-white p-6 mb-8 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Sobre Nosotros</h2>
        {isOwner && !isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          >
            <Edit3 size={16} />
            Editar
          </button>
        )}
        {isOwner && isEditing && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <Save size={16} />
              Guardar
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X size={16} />
              Cancelar
            </button>
          </div>
        )}
      </div>

      <div className="mb-6">
        {isEditing ? (
          <textarea
            value={tempData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            rows={4}
            placeholder="Describe tu granja, experiencia y filosofía de trabajo..."
          />
        ) : (
          <p className="text-gray-600 leading-relaxed">
            {formData.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-1">Tipo de Agricultura</h3>
          {isEditing ? (
            <select
              value={tempData.agricultureType}
              onChange={(e) => handleInputChange('agricultureType', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="Orgánica Certificada">Orgánica Certificada</option>
              <option value="Convencional">Convencional</option>
              <option value="Hidropónica">Hidropónica</option>
              <option value="Permacultura">Permacultura</option>
              <option value="Biodinámica">Biodinámica</option>
            </select>
          ) : (
            <p className="text-gray-600">{formData.agricultureType}</p>
          )}
        </div>

        <div className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-1">Tamaño de la Granja</h3>
          {isEditing ? (
            <input
              type="text"
              value={tempData.farmSize}
              onChange={(e) => handleInputChange('farmSize', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="ej. 15 Hectáreas"
            />
          ) : (
            <p className="text-gray-600">{formData.farmSize}</p>
          )}
        </div>

        <div className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-1">Años de Experiencia</h3>
          {isEditing ? (
            <input
              type="text"
              value={tempData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="ej. 20+ Años"
            />
          ) : (
            <p className="text-gray-600">{formData.experience}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;