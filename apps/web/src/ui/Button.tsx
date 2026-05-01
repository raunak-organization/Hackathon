'use client';
import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

const variants = {
  primary: 'bg-text-primary text-bg-primary hover:bg-white shadow-sm',
  secondary:
    'bg-bg-secondary text-text-primary border border-border hover:bg-bg-tertiary',
  danger: 'text-red-500 border border-red-500/30 hover:bg-red-500/10',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-white/5',
};

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-9 px-4 text-sm',
  lg: 'h-11 px-6 text-base',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
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
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all',
          'disabled:opacity-50 disabled:pointer-events-none',
          'focus:outline-none focus:ring-1 focus:ring-neutral-500',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {isLoading ? <Loader2 className="animate-spin" size={16} /> : leftIcon}

        {children}

        {!isLoading && rightIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';
