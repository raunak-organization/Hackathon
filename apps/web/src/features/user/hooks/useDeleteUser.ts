import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../services/user.api';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import logger from '@/lib/logger';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      queryClient.clear();
      clearAuth();
      router.replace('/auth/login');
    },

    onError: (error) => {
      logger.error(error.message);
    },
  });
};
