import React from 'react';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseStyles = "relative font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center overflow-hidden group";
  
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  const variants = {
    primary: "bg-primary text-background hover:bg-white hover:text-black border border-transparent active:translate-y-px",
    secondary: "bg-surface border border-white/10 text-white hover:bg-surfaceHighlight",
    outline: "bg-transparent border border-primary/40 text-primary hover:bg-primary/5 hover:border-primary",
    ghost: "bg-transparent text-muted hover:text-white"
  };

  const widthClass = fullWidth ? "w-full" : "";
  const roundedClass = "rounded-none"; // Fully angular for a professional look

  return (
    <button 
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${widthClass} ${roundedClass} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};
