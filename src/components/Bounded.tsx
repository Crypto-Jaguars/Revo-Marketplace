import React from 'react';

interface BoundedProps {
  children: React.ReactNode;
  center?: boolean;
  className?: string;
}

const Bounded: React.FC<BoundedProps> = ({ children, center, className = '' }) => {
  return (
    <section
      className={`w-full px-4 md:px-6 ${
        center ? 'flex justify-center items-center' : ''
      } ${className}`}
    >
      {children}
    </section>
  );
};

export default Bounded;
