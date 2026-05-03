import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/features/auth/services/auth.api';
import { useAuthStore } from '../store/auth.store';

export const useMe = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: isAuthenticated,
    retry: false,
  });
};
