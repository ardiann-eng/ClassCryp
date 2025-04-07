import React from 'react';
import cryptgenLogoPath from "../../assets/379520899_6375696149206329_46838.png";

export const CryptgenLogo: React.FC<{ className?: string, white?: boolean }> = ({ className = 'h-8 w-8', white = false }) => {
  if (white) {
    // White version of the logo for dark backgrounds
    return (
      <svg 
        className={className} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle - incomplete to match the logo */}
        <path d="M75 20 A 40 40 0 1 0 20 75" stroke="white" strokeWidth="10" strokeLinecap="round" fill="none" />
        
        {/* Middle arc - incomplete C shape */}
        <path d="M67 33 A 25 25 0 0 0 33 67" stroke="white" strokeWidth="8" strokeLinecap="round" fill="none" />
        
        {/* Inner C */}
        <path d="M60 42 A 15 15 0 0 0 42 60" stroke="white" strokeWidth="8" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  
  // Original imported logo from assets
  return <img src={cryptgenLogoPath} alt="Cryptgen Logo" className={className} />;
};

export default CryptgenLogo;