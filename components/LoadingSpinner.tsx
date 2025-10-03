import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-16">
        <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        <p className="text-gray-300 text-lg">Generating brilliant ideas...</p>
    </div>
  );
};

export default LoadingSpinner;
