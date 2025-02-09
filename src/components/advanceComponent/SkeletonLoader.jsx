import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded"></div>
    </div>
  );
};

export default SkeletonLoader;