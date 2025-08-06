import React from 'react';

interface BackgroundElementsProps {
  children: React.ReactNode;
  className?: string;
}

const BackgroundElements: React.FC<BackgroundElementsProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-primary rounded-full opacity-5 animate-pulse-glow blur-3xl" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full opacity-3 animate-pulse-glow blur-3xl" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-4 animate-pulse-glow blur-2xl" style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,165,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,165,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      
      {children}
    </div>
  );
};

export default BackgroundElements; 