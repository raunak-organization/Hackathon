'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '../stores/auth.store';

/**
 * GuestGuard — wraps pages that should only be accessible to
 * unauthenticated users (login, register, reset-password).
 * If the user is already authenticated, they get redirected to /.
 */
export const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) return null;
  if (isAuthenticated) return null;

  return <>{children}</>;
};
