import React from 'react';

interface StepCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description }) => {
  return (
    <div className="group relative rounded-3xl bg-gradient-to-bl from-forest-200 via-forest-50 to-forest-100 p-[3px] transition-all duration-300 hover:shadow-lg hover:from-forest-300 hover:via-forest-50 hover:to-forest-150 hover:scale-[1.035] active:scale-[0.97]">
      <div className="flex flex-col items-center rounded-3xl bg-white/90 backdrop-blur-sm text-center p-6 shadow-sm focus-within:ring-2 focus-within:ring-forest-300/60 transition-colors duration-300">
        <div className="w-14 h-14 flex items-center justify-center rounded-full mb-4 bg-gradient-to-br from-forest-700 to-forest-600 shadow-inner">
          {React.cloneElement(icon, {
            className: 'w-7 h-7',
            style: { color: '#FFFFFF' },
            'aria-hidden': 'true',
          })}
        </div>
        <h3 className="text-xl font-semibold text-forest-900 mb-2 tracking-tight">{title}</h3>
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;
