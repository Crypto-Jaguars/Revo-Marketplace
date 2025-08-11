import React from 'react';

interface StepCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-6 rounded-3xl bg-surface-0 shadow-sm border-2 border-brand-200/80 hover:shadow-md hover:border-brand-300/80 transition-all duration-300">
      <div className="w-14 h-14 flex items-center justify-center bg-forest-800 rounded-full mb-4">
        {React.cloneElement(icon, { 
          className: 'w-7 h-7', 
          style: { color: '#FFFFFF' },
          'aria-hidden': 'true'
        })}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default StepCard;
