'use client';

import { useMe } from '../hooks/useMe';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // ❌ not logged in
    if (isError || !data?.data) {
      router.replace('/auth/login');
    }
  }, [isLoading, isError, data, router]);

  if (isLoading) return <p>Loading...</p>;

  return <>{children}</>;
};
