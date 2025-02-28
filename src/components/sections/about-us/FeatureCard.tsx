import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="w-full max-w-[400px] h-[260px] p-6 bg-white shadow-xl rounded-lg text-center border border-gray-200 transition-transform duration-300 hover:scale-105 flex flex-col justify-center">
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600 text-base">{description}</p>
    </div>
  );
};

export default FeatureCard;
