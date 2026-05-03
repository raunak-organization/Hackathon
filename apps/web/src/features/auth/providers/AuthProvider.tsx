'use client';
import { useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const init = useAuthStore((s) => s.init);
  const isLoading = useAuthStore((s) => s.isLoading);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) return;

    void init();
  }, [init, isAuthenticated]);

  if (isLoading) return <p>Loading...</p>;

  return <>{children}</>;
};
