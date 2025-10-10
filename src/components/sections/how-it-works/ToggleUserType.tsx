import React from 'react';
import { useTranslations } from 'next-intl';

interface ToggleUserTypeProps {
  activeType: 'farmer' | 'buyer';
  onChange: (type: 'farmer' | 'buyer') => void;
}

const ToggleUserType: React.FC<ToggleUserTypeProps> = ({ activeType, onChange }) => {
  const t = useTranslations('HowWeWork');

  return (
    <div className="relative inline-flex items-center p-1.5 bg-white/70 backdrop-blur-sm rounded-full shadow-sm border border-gray-200/50 transform-gpu transition-all duration-300 hover:shadow-lg hover:border-forest-200 hover:scale-[1.02] active:scale-[0.98] focus-within:ring-2 focus-within:ring-forest-400/40">
      {/* Sliding Active Background */}
      <div
        className="absolute h-[calc(100%-12px)] bg-forest-600 rounded-full shadow-sm transition-all duration-500 ease-out transform-gpu"
        style={{
          width: 'calc(50% - 6px)',
          left: activeType === 'farmer' ? '6px' : 'calc(50% + 0px)',
          top: '6px',
        }}
      />

      {/* Farmer Button */}
      <button
        onClick={() => onChange('farmer')}
        className={`relative z-10 px-10 py-3 rounded-full font-semibold text-base transition-all duration-300 transform-gpu hover:scale-[1.02] active:scale-[0.98] ${
          activeType === 'farmer' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
        }`}
        aria-pressed={activeType === 'farmer'}
        aria-label={t('toggle.switchUserType')}
      >
        {t('toggle.farmer')}
      </button>

      {/* Buyer Button */}
      <button
        onClick={() => onChange('buyer')}
        className={`relative z-10 px-10 py-3 rounded-full font-semibold text-base transition-all duration-300 transform-gpu hover:scale-[1.02] active:scale-[0.98] ${
          activeType === 'buyer' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
        }`}
        aria-pressed={activeType === 'buyer'}
        aria-label={t('toggle.switchUserType')}
      >
        {t('toggle.buyer')}
      </button>
    </div>
  );
};

export default ToggleUserType;
