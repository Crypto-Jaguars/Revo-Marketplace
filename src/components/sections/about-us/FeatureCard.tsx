import React, { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col gap-1 items-start p-6 rounded-3xl border-2 border-brand-200/80 bg-surface-0 shadow-sm hover:shadow-md hover:border-brand-300/80 transition-all duration-300">
      <div className="flex-shrink-0 mb-3 ml-1">
        {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement, {
          'aria-hidden': 'true'
        })}
      </div>
        <h3 className="text-xl font-semibold text-forest-900">{title}</h3>
        <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default FeatureCard;
