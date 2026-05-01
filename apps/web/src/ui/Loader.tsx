'use client';
import { Loader2 } from 'lucide-react';

export const Loader = ({
  size = 20,
  fullScreen,
}: {
  size?: number;
  fullScreen?: boolean;
}) => {
  const spinner = (
    <Loader2 size={size} className="animate-spin text-blue-500" />
  );

  if (!fullScreen) return spinner;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      {spinner}
    </div>
  );
};
