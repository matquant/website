import React from 'react';
import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  darker?: boolean;
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  id, 
  className = '',
  darker = false
}) => {
  return (
    <section 
      id={id} 
      className={`py-20 px-4 md:px-8 ${darker ? 'bg-black/40' : ''} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};
