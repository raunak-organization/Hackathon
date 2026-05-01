import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../services/user.api';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearAuth } from '@/features/auth/states/auth.slice';
import logger from '@/lib/logger';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.clear();
      dispatch(clearAuth());
      router.replace('/login');
    },
    onError: (error) => {
      logger.error(error.message);
    },
  });
};
