import React from 'react';
import { useTranslations } from 'next-intl';

interface ToggleUserTypeProps {
  activeType: 'farmer' | 'buyer';
  onChange: (type: 'farmer' | 'buyer') => void;
}

const ToggleUserType: React.FC<ToggleUserTypeProps> = ({ activeType, onChange }) => {
  const t = useTranslations('HowItWorks.toggle');

  return (
    <div
      role="group"
      aria-label={t('switchUserType')}
      className="relative flex items-center bg-white rounded-full p-1 shadow-sm border border-gray-200 w-full max-w-xs"
    >
      <div
        className="absolute top-1 left-1 h-[85%] bg-primary_green rounded-full transition-transform duration-300"
        style={{
          width: `calc(50% - 4px)`,
          transform: activeType === 'buyer' ? 'translateX(100%)' : 'translateX(0)',
        }}
        aria-hidden="true"
      />
      <button
        onClick={() => onChange('farmer')}
        className="relative z-10 flex-1 text-base font-medium transition-colors duration-300 px-4 py-2 focus:outline-none"
        style={{ color: activeType === 'farmer' ? 'white' : '#4B5563' }}
        aria-pressed={activeType === 'farmer'}
      >
        {t('farmer')}
      </button>
      <button
        onClick={() => onChange('buyer')}
        className="relative z-10 flex-1 text-base font-medium transition-colors duration-300 px-4 py-2 focus:outline-none"
        style={{ color: activeType === 'buyer' ? 'white' : '#4B5563' }}
        aria-pressed={activeType === 'buyer'}
      >
        {t('buyer')}
      </button>
    </div>
  );
};

export default ToggleUserType;
