import React from 'react';

interface BackgroundElementsProps {
  children: React.ReactNode;
  className?: string;
}

const BackgroundElements: React.FC<BackgroundElementsProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Subtle monochrome atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full opacity-[0.03] blur-3xl" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-primary rounded-full opacity-[0.02] blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {children}
    </div>
  );
};

export default BackgroundElements;
