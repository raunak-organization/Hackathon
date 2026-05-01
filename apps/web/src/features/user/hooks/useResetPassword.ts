import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../services/user.api';
import { ResetPasswordRequestPayload } from '../type';
import logger from '@/lib/logger';

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (payload: ResetPasswordRequestPayload) =>
      await resetPassword(payload),
    onSuccess: () => {},
    onError: (error) => {
      logger.error(error.message);
    },
  });
};
