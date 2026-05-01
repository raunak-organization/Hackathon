import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateName } from '../services/user.api';
import { UpdateNamePayload } from '../type';
import logger from '@/lib/logger';

export const useUpdateName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateNamePayload) => await updateName(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (error) => {
      logger.error(error.message);
    },
  });
};
