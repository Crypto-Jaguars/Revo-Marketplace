import React, { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index?: number; // for animation
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col gap-2 items-start p-6 rounded-3xl border border-brand-200 bg-gradient-to-b from-forest-100 to-surface-0 shadow-sm transition-all duration-300 transform-gpu hover:shadow-lg hover:border-forest-200 hover:scale-[1.03] active:scale-[0.97] focus-within:ring-2 focus-within:ring-forest-400/40">
      <div className="flex items-center justify-center w-12 h-12 mb-1">
        {React.isValidElement(icon) &&
          React.cloneElement(icon as React.ReactElement, {
            className: 'w-8 h-8',
            style: { color: '#486156' },
            'aria-hidden': 'true',
          })}
      </div>
      <h3 className="text-lg font-semibold text-forest-900 tracking-tight">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm md:text-base">{description}</p>
    </div>
  );
};

export default FeatureCard;
