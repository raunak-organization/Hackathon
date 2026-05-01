import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEmail } from '../services/user.api';
import { UpdateEmailPayload } from '../type';
import logger from '@/lib/logger';

export const useUpdateEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateEmailPayload) =>
      await updateEmail(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (error) => {
      logger.error(error.message);
    },
  });
};
