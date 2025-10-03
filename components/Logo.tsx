import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = 'h-16 w-auto' }) => (
  <svg
    viewBox="0 0 400 100"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-label="STWNY Logo"
  >
    <defs>
      <linearGradient id="logoGradientWNY" x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="50%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#22d3ee" />
      </linearGradient>
      <linearGradient id="arrowGradient" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#6d28d9" />
        <stop offset="100%" stopColor="#db2777" />
      </linearGradient>
    </defs>
    
    <g transform="translate(-10, 0)">
        <path
          d="M 180 90 L 370 5"
          stroke="url(#arrowGradient)"
          strokeWidth="15"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M340 5 L 370 5 L 355 30 Z"
          fill="url(#arrowGradient)"
        />
    </g>

    <text
      x="0"
      y="80"
      fontFamily="Poppins, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
      fontSize="90"
      fontWeight="900"
      fill="white"
      letterSpacing="-0.05em"
    >
      ST
    </text>
    <text
      x="145"
      y="80"
      fontFamily="Poppins, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
      fontSize="90"
      fontWeight="900"
      fill="url(#logoGradientWNY)"
      letterSpacing="-0.05em"
    >
      WNY
    </text>
  </svg>
);

export default Logo;
