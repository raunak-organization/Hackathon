'use client';
import { useEffect } from 'react';
import { useAuthStore } from '../stores/auth.store';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const init = useAuthStore((s) => s.init);

  useEffect(() => {
    void init();
  }, [init]);

  return <>{children}</>;
};
