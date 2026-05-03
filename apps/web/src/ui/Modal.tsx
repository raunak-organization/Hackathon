'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-999 flex items-center justify-center bg-[rgba(14,17,22,0.7)] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[500px] max-h-[90vh] overflow-y-auto rounded-(--border-radius) border border-(--border) bg-(--bg-secondary) shadow-[0_20px_25px_-5_rgba(0,0,0,0.5),0_10px_10px_-5_rgba(0,0,0,0.04)] transition duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-(--border) px-6 py-5">
          {title && (
            <h2 className="m-0 text-[1.1rem] font-semibold">{title}</h2>
          )}
          <button
            className="rounded-[4px] p-1 text-(--text-secondary) transition duration-150 ease-in-out hover:bg-[rgba(255,255,255,0.1)] hover:text-(--text-primary)"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
