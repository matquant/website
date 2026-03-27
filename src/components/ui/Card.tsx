import React from 'react';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  noPadding?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  hoverEffect = true,
  noPadding = false,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
      relative bg-surface border border-white/5 overflow-hidden
      ${onClick ? 'cursor-pointer' : ''}
      ${hoverEffect ? 'hover:border-primary/20 hover:bg-surfaceHighlight transition-colors duration-200 group' : ''} 
      ${noPadding ? 'p-0' : 'p-6 md:p-8'}
      ${className}
    `}>
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
