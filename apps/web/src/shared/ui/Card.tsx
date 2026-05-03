'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hoverable = false,
  ...props
}) => {
  const baseClasses =
    'bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[var(--border-radius)] overflow-hidden shadow-[0_4px_6px_-1_rgba(0,0,0,0.1),0_2px_4px_-1_rgba(0,0,0,0.06)] transition duration-150 ease-in-out';

  const paddingClasses: Record<string, string> = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-10',
  };

  const hoverClasses = hoverable
    ? 'hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3_rgba(0,0,0,0.1),0_4px_6px_-2_rgba(0,0,0,0.05)] hover:border-[#404040]'
    : '';

  return (
    <div
      className={`${baseClasses} ${paddingClasses[padding]} ${hoverClasses} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};
