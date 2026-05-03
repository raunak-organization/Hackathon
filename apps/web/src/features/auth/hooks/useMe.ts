import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/features/auth/services/auth.api';
import { useAuthStore } from '../stores/auth.store';
import { MeResponse } from '../types';

export const useMe = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<MeResponse>({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: isAuthenticated,
    retry: false,
  });
};
