import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 text-center text-gray-500">
      <p>
        Powered by{' '}
        <a
          href="https://www.stwny.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-pink-500 hover:text-pink-400 transition-colors"
        >
          STWNY
        </a>
      </p>
    </footer>
  );
};

export default Footer;
