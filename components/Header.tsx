import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center">
      <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2">
        <Logo className="h-12 md:h-14" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter">
          AI Content Idea Generator
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
        Generate brilliant social media content ideas in seconds. Powered by AI, crafted for marketers.
      </p>
    </header>
  );
};

export default Header;
