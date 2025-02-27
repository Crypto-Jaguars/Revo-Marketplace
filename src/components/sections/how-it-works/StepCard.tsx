import React from "react";

interface StepCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center w-full max-w-xs">
      <div className="w-16 h-16 flex items-center justify-center bg-[#375B42] rounded-full mb-4">
        {React.cloneElement(icon, { className: "w-8 h-8 text-white stroke-white" })}
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default StepCard;
