'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading,
      leftIcon,
      rightIcon,
      fullWidth,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center gap-2 rounded-[var(--border-radius)] font-medium transition duration-150 ease-in-out border border-transparent cursor-pointer whitespace-nowrap';

    const variantClasses: Record<string, string> = {
      primary:
        'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-white hover:shadow-[0_0_12px_rgba(255,255,255,0.2)]',
      secondary:
        'bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border)] hover:bg-[var(--bg-tertiary)] hover:border-[#404040]',
      danger:
        'bg-transparent text-[var(--accent-red)] border-[rgba(239,68,68,0.3)] hover:bg-[rgba(239,68,68,0.1)] hover:border-[var(--accent-red)]',
      ghost:
        'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)]',
    };

    const sizeClasses: Record<string, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-[0.95rem]',
      lg: 'px-6 py-3 text-base',
    };

    const disabledClasses =
      disabled || isLoading ? 'opacity-60 cursor-not-allowed' : '';
    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClasses} ${className}`.trim()}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="animate-spin" size={18} />}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';
