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
    primary: "bg-primary text-background hover:bg-white hover:text-black shadow-[0_0_15px_rgba(0,255,148,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] border border-transparent",
    secondary: "bg-surface border border-white/10 text-white hover:border-primary/50 hover:text-primary hover:bg-white/5",
    outline: "bg-transparent border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_15px_rgba(0,255,148,0.2)]",
    ghost: "bg-transparent text-muted hover:text-white"
  };

  const widthClass = fullWidth ? "w-full" : "";
  const roundedClass = "rounded-sm"; // More angular for tech feel

  return (
    <button 
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${widthClass} ${roundedClass} ${className}`}
      {...props}
    >
      {/* Glitch/Tech hover effect overlay */}
      <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};
