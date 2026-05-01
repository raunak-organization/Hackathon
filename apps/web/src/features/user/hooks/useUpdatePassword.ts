import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '../services/user.api';
import { UpdatePasswordPayload } from '../type';
import logger from '@/lib/logger';

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (payload: UpdatePasswordPayload) =>
      await updatePassword(payload),
    onError: (error) => {
      logger.error(error.message);
    },
  });
};
