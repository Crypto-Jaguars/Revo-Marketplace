import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="rounded-[20px] w-full max-w-sm" role="status" aria-label="Loading product">
      <div className="animate-pulse">
        <div className="bg-gray-300 aspect-square w-full max-w-[295px] rounded-[20px] mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="flex items-center mb-2">
          <div className="h-4 bg-gray-300 rounded w-1/4 mr-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/6"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
}
