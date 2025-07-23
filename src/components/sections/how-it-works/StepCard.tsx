import React from 'react';

interface StepCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="w-14 h-14 flex items-center justify-center bg-primary_green rounded-full mb-4">
        {React.cloneElement(icon, { className: 'w-7 h-7', style: { color: '#FFFFFF' } })}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default StepCard;
