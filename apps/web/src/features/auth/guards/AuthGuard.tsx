'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return <p>You are not authenticated</p>;

  return <>{children}</>;
};
