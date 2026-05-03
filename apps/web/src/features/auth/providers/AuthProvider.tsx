'use client';
import { useEffect } from 'react';
import { useAuthStore } from '../stores/auth.store';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const init = useAuthStore((s) => s.init);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    void init();
  }, [init]);

  if (isLoading) return <p>Loading...</p>;

  return <>{children}</>;
};
