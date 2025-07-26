"use client";

import React from 'react';
import { Edit3, Phone, Mail, MapPin, Clock, Facebook, Instagram, Globe } from 'lucide-react';

const ContactInfo = ({ isOwner = false }) => {
  const contactData = {
    phone: "+34 123 456 789",
    email: "contacto@granjaelparaiso.es",
    whatsapp: "+34 123 456 789",
    location: "Valle Verde, Región Agrícola, España",
    schedule: {
      weekdays: "8:00 - 18:00",
      weekend: "9:00 - 14:00"
    }
  };

  return (
    <section className="bg-white p-6 mb-8 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Información de Contacto</h2>
        {isOwner && (
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
            <Edit3 size={16} />
            Editar
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        {/* Ubicación */}
        <div className="flex items-start space-x-3">
          <MapPin className="w-6 h-6 text-filter_active stroke-2 flex-shrink-0 mt-1" fill="none" />
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1">Ubicación</h3>
            <p className="text-gray-600">{contactData.location}</p>
          </div>
        </div>

        {/* Teléfono */}
        <div className="flex items-start space-x-3">
          <Phone className="w-6 h-6 text-filter_active stroke-2 flex-shrink-0 mt-1" fill="none" />
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
            <p className="text-gray-600">{contactData.phone}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start space-x-3">
          <Mail className="w-6 h-6 text-filter_active stroke-2 flex-shrink-0 mt-1" fill="none" />
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
            <p className="text-gray-600 break-all">{contactData.email}</p>
          </div>
        </div>

        {/* Horario de Atención */}
        <div className="flex items-start space-x-3">
          <Clock className="w-6 h-6 text-filter_active stroke-2 flex-shrink-0 mt-1" fill="none" />
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1">Horario de Atención</h3>
            <div className="text-gray-600 space-y-1">
              <p>Lun - Sáb: {contactData.schedule.weekdays}</p>
              <p>Dom: {contactData.schedule.weekend}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Redes Sociales */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Redes Sociales</h3>
        <div className="flex items-center space-x-6">
          <a href="#" className="text-filter_active hover:opacity-75 transition-opacity">
            <Facebook className="w-6 h-6 stroke-2" fill="none" />
          </a>
          <a href="#" className="text-filter_active hover:opacity-75 transition-opacity">
            <Instagram className="w-6 h-6 stroke-2" fill="none" />
          </a>
          <a href="#" className="text-filter_active hover:opacity-75 transition-opacity">
            <Phone className="w-6 h-6 stroke-2" fill="none" />
          </a>
          <a href="#" className="text-filter_active hover:opacity-75 transition-opacity">
            <Globe className="w-6 h-6 stroke-2" fill="none" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;