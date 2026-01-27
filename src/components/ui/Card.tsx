import React from 'react';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  hoverEffect = true,
  noPadding = false
}) => {
  return (
    <div className={`
      relative bg-surface/40 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden
      ${hoverEffect ? 'hover:border-primary/30 hover:shadow-glow hover:bg-surface/60 transition-all duration-500 group' : ''} 
      ${noPadding ? 'p-0' : 'p-6'}
      ${className}
    `}>
      {/* Tech Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/10 rounded-tl-sm"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/10 rounded-tr-sm"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/10 rounded-bl-sm"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/10 rounded-br-sm"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
