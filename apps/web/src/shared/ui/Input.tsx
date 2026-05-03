'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className = '', label, error, leftIcon, rightIcon, id, ...props },
    ref,
  ) => {
    const reactId = React.useId();
    const inputId = id || `input-${reactId}`;

    return (
      <div className={`flex flex-col gap-2 w-full ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-(--text-secondary)"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 flex items-center text-(--text-secondary)">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full bg-(--bg-primary) border rounded-(--border-radius) text-(--text-primary) text-[0.95rem] transition duration-150 ease-in-out outline-none placeholder:text-[#52525b] ${
              leftIcon ? 'pl-10' : 'px-3'
            } ${rightIcon ? 'pr-10' : 'px-3'} py-2.5 border-(--border) focus:border-(--text-secondary) focus:ring-1 focus:ring-[rgba(161,161,170,0.2)] ${
              error
                ? 'border-(--accent-red) focus:border-(--accent-red) focus:ring-[rgba(239,68,68,0.2)]'
                : ''
            }`}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 flex items-center text-(--text-secondary)">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <span className="text-(--accent-red) text-xs mt-1">{error}</span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
