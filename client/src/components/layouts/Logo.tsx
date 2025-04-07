import React from 'react';

export const CryptgenLogo: React.FC<{ className?: string }> = ({ className = 'h-8 w-8' }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer lime green circle - incomplete to match the logo */}
      <path d="M75 20 A 40 40 0 1 0 20 75" stroke="#B8D63A" strokeWidth="10" strokeLinecap="round" fill="none" />
      
      {/* Middle blue-purple arc - incomplete C shape */}
      <path d="M67 33 A 25 25 0 0 0 33 67" stroke="#9A77FF" strokeWidth="8" strokeLinecap="round" fill="none" />
      
      {/* Inner purple C */}
      <path d="M60 42 A 15 15 0 0 0 42 60" stroke="#7C3AED" strokeWidth="8" strokeLinecap="round" fill="none" />
    </svg>
  );
};

export default CryptgenLogo;