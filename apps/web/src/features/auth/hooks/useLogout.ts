'use client';

import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { logout } from '@/features/auth/services/auth.api';
import { clearAuth } from '@/features/auth/states/auth.slice';
import { setAccessToken } from '@/lib/client';
import logger from '@/lib/logger';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation<{ message: string }, Error>({
    mutationFn: logout,

    onSuccess: () => {
      setAccessToken(null);
      dispatch(clearAuth());
      router.replace('/login');
    },

    onError: (error) => {
      logger.error(error.message);
    },
  });
};
