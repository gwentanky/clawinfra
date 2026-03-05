'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = ''
}: ButtonProps) {

  const baseStyles = 'cursor-pointer relative font-semibold transition-all duration-300 overflow-hidden group uppercase font-heading';

  const sizeStyles = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-4 text-md',
    lg: 'px-10 py-5 text-lg'
  };

  const variantStyles = {
    primary: `
      bg-transparent text-primary border-2 border-primary
      hover:bg-primary hover:text-black
      shadow-[0_0_15px_rgba(255,0,110,0.3)]
      hover:shadow-[0_0_25px_rgba(255,0,110,0.6),inset_0_0_20px_rgba(255,0,110,0.1)]
    `,
    secondary: `
      bg-transparent text-secondary border-2 border-secondary
      hover:bg-secondary hover:text-black
      shadow-[0_0_15px_rgba(0,217,255,0.3)]
      hover:shadow-[0_0_25px_rgba(0,217,255,0.6),inset_0_0_20px_rgba(0,217,255,0.1)]
    `,
    outline: `
      bg-transparent text-foreground border-2 border-foreground/30
      hover:bg-foreground hover:text-background hover:border-foreground
      shadow-[0_0_15px_rgba(255,107,107,0.3)]
      hover:shadow-[0_0_25px_rgba(255,107,107,0.6),inset_0_0_20px_rgba(255,107,107,0.1)]
    `,
    ghost: `
      bg-card-bg/50 backdrop-blur-sm border-2 border-primary/30 text-foreground
      hover:bg-card-bg/80 hover:border-primary/60
      shadow-[0_0_10px_rgba(255,0,110,0.15)]
      hover:shadow-[0_0_20px_rgba(255,0,110,0.3)]
    `
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
        clip-corner
      `}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
      }}
    >
      {/* Glitch effect line */}
      <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Scan line effect */}
      <span className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000" />

      {/* Corner accent */}
      <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
