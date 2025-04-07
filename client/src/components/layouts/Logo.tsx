import React from 'react';

export const CryptgenLogo: React.FC<{ className?: string }> = ({ className = 'h-8 w-8' }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer green circle */}
      <circle cx="50" cy="50" r="30" stroke="#C4DD69" strokeWidth="6" strokeLinecap="round" strokeDasharray="100 17" strokeDashoffset="0" fill="none" />
      
      {/* Inner blue half circle */}
      <path d="M50 35 A 15 15 0 1 1 50 65 A 15 15 0 1 1 50 35" stroke="#818CF8" strokeWidth="5" strokeLinecap="round" strokeDasharray="70 22" strokeDashoffset="0" fill="none" />
      
      {/* Inner purple C */}
      <path d="M50 40 A 10 10 0 1 1 50 60 A 10 10 0 1 1 50 40" stroke="#6D28D9" strokeWidth="4" strokeLinecap="round" strokeDasharray="40 30" strokeDashoffset="-5" fill="none" />
    </svg>
  );
};

export default CryptgenLogo;