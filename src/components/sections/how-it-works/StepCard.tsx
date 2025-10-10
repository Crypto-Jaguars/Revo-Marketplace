import React from 'react';

interface StepCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  index: number;
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description, index }) => {
  return (
    <div
      className="group flex flex-col gap-2 items-start p-6 rounded-3xl border border-brand-200 bg-gradient-to-b from-forest-100 to-surface-0 shadow-sm transition-all duration-500 ease-out hover:shadow-xl hover:shadow-forest-200/30 hover:border-forest-300 hover:-translate-y-2 active:scale-[0.98] focus-within:ring-2 focus-within:ring-forest-400/40"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
        willChange: 'transform',
      }}
    >
      {/* Animated glow effect on hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-forest-300/0 via-forest-200/0 to-forest-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10 group-hover:from-forest-300/20 group-hover:via-forest-200/10 group-hover:to-forest-300/20" />

      {/* Icon with enhanced animations */}
      <div className="flex items-center justify-center w-12 h-12 mb-1 transition-all duration-500 group-hover:scale-125 ">
        {React.cloneElement(icon, {
          className: 'w-8 h-8 transition-all duration-500',
          style: { color: '#486156' },
          'aria-hidden': 'true',
        })}
      </div>

      {/* Title with smooth color transition */}
      <h3 className="text-lg font-semibold text-forest-900 tracking-tight transition-all duration-300 group-hover:text-forest-700 group-hover:translate-x-1">
        {title}
      </h3>

      {/* Description with fade effect */}
      <p className="text-gray-600 leading-relaxed text-sm md:text-base transition-all duration-300 group-hover:text-gray-800">
        {description}
      </p>

      {/* Bottom accent line that expands on hover */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-0 bg-gradient-to-r from-transparent via-forest-500 to-transparent transition-all duration-500 group-hover:w-3/4 rounded-full" />
    </div>
  );
};

export default StepCard;
