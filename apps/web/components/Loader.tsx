'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  size?: number;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 24,
  fullScreen = false,
}) => {
  return (
    <>
      {fullScreen ? (
        <div className="fullScreen">
          <Loader2 className="spinner" size={size} />
        </div>
      ) : (
        <Loader2 className="spinner" size={size} />
      )}
      <style jsx>{`
        .spinner {
          animation: spin 1s linear infinite;
          color: var(--accent-blue);
        }
        .fullScreen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(14, 17, 22, 0.8);
          backdrop-filter: blur(4px);
          z-index: 9999;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};
