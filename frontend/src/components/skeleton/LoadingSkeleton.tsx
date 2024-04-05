import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
      <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
      <div className="w-2/4 h-4 bg-gray-300 rounded"></div>
      <div className="w-3/5 h-4 bg-gray-300 rounded"></div>
    </div>
  );
};

export default LoadingSkeleton;
