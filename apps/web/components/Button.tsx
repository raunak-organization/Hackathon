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
    return (
      <>
        <button
          ref={ref}
          className={`btn ${variant} ${size} ${fullWidth ? 'fullWidth' : ''} ${className}`}
          disabled={disabled || isLoading}
          {...props}
        >
          {isLoading && <Loader2 className="spinner" size={18} />}
          {!isLoading && leftIcon}
          {children}
          {!isLoading && rightIcon}
        </button>
        <style jsx>{`
          .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            border-radius: var(--border-radius);
            font-family: inherit;
            font-weight: 500;
            transition: var(--transition);
            border: 1px solid transparent;
            cursor: pointer;
            white-space: nowrap;
          }
          .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
          .fullWidth {
            width: 100%;
          }
          .spinner {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .primary {
            background-color: var(--text-primary);
            color: var(--bg-primary);
          }
          .primary:not(:disabled):hover {
            background-color: #ffffff;
            box-shadow: 0 0 12px rgba(255, 255, 255, 0.2);
          }
          .secondary {
            background-color: var(--bg-secondary);
            color: var(--text-primary);
            border-color: var(--border);
          }
          .secondary:not(:disabled):hover {
            background-color: var(--bg-tertiary);
            border-color: #404040;
          }
          .danger {
            background-color: transparent;
            color: var(--accent-red);
            border-color: rgba(239, 68, 68, 0.3);
          }
          .danger:not(:disabled):hover {
            background-color: rgba(239, 68, 68, 0.1);
            border-color: var(--accent-red);
          }
          .ghost {
            background-color: transparent;
            color: var(--text-secondary);
          }
          .ghost:not(:disabled):hover {
            color: var(--text-primary);
            background-color: rgba(255, 255, 255, 0.05);
          }
          .sm {
            padding: 0.375rem 0.75rem;
            font-size: 0.875rem;
          }
          .md {
            padding: 0.5rem 1rem;
            font-size: 0.95rem;
          }
          .lg {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
          }
        `}</style>
      </>
    );
  },
);

Button.displayName = 'Button';
