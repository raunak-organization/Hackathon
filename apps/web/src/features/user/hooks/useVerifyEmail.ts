import { useMutation, useQueryClient } from '@tanstack/react-query';
import { verifyEmailUpdate } from '../services/user.api';
import logger from '@/lib/logger';

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (token: string) => await verifyEmailUpdate(token),
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (error) => {
      logger.error(error.message);
    },
  });
};
