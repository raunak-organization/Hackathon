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
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-[rgba(14,17,22,0.8)] backdrop-blur-sm">
          <Loader2 className="animate-spin text-(--accent-blue)" size={size} />
        </div>
      ) : (
        <Loader2 className="animate-spin text-(--accent-blue)" size={size} />
      )}
    </>
  );
};
