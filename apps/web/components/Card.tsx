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
  return (
    <>
      <div
        className={`card pad-${padding} ${hoverable ? 'hoverable' : ''} ${className}`}
        {...props}
      >
        {children}
      </div>
      <style jsx>{`
        .card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: var(--transition);
        }
        .hoverable:hover {
          transform: translateY(-2px);
          box-shadow:
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border-color: #404040;
        }
        .pad-none {
          padding: 0;
        }
        .pad-sm {
          padding: 0.75rem;
        }
        .pad-md {
          padding: 1.5rem;
        }
        .pad-lg {
          padding: 2.5rem;
        }
      `}</style>
    </>
  );
};
