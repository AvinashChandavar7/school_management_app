import React from 'react';

const CardsLoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div className="w-full p-6 bg-blue-200 border border-gray-200 rounded-md">
        <div className="w-20 h-4 mb-2 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>
      <div className="w-full p-6 bg-green-200 border border-gray-200 rounded-md">
        <div className="w-20 h-4 mb-2 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>
      <div className="w-full p-6 bg-purple-200 border border-gray-200 rounded-md">
        <div className="w-20 h-4 mb-2 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default CardsLoadingSkeleton;
