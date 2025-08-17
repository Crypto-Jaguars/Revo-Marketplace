import React from 'react';
import { useTranslations } from 'next-intl';

interface ToggleUserTypeProps {
  activeType: 'farmer' | 'buyer';
  onChange: (type: 'farmer' | 'buyer') => void;
}

const ToggleUserType: React.FC<ToggleUserTypeProps> = ({ activeType, onChange }) => {
  const t = useTranslations('HowWeWork.toggle');

  return (
    <div
      role="group"
      aria-label={t('switchUserType')}
      className="relative flex items-center bg-surface-0 rounded-full p-1 shadow-sm border border-gray-200 w-full max-w-xs"
    >
      <div
        className="absolute top-1 left-1 h-[85%] bg-forest-800 rounded-full transition-transform duration-300"
        style={{
          width: `calc(50% - 4px)`,
          transform: activeType === 'buyer' ? 'translateX(100%)' : 'translateX(0)',
        }}
        aria-hidden="true"
      />
      <button
        onClick={() => onChange('farmer')}
        className={`relative z-10 flex-1 text-base font-semibold transition-all duration-300 px-4 py-2 focus:outline-none rounded-full ${
          activeType === 'farmer' 
            ? 'text-white' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        style={activeType === 'farmer' ? { color: '#FFFFFF' } : {}}
        aria-pressed={activeType === 'farmer'}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange('farmer');
          }
        }}
      >
        {t('farmer')}
      </button>
      <button
        onClick={() => onChange('buyer')}
        className={`relative z-10 flex-1 text-base font-semibold transition-all duration-300 px-4 py-2 focus:outline-none rounded-full ${
          activeType === 'buyer' 
            ? 'text-white' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        style={activeType === 'buyer' ? { color: '#FFFFFF' } : {}}
        aria-pressed={activeType === 'buyer'}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange('buyer');
          }
        }}
      >
        {t('buyer')}
      </button>
    </div>
  );
};

export default ToggleUserType;
