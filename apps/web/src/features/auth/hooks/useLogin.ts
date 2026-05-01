'use client';

import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { login } from '@/features/auth/services/auth.api';
import { setAccessToken } from '@/lib/client';
import { setAuth } from '@/features/auth/states/auth.slice';
import logger from '@/lib/logger';
import { AuthResponse } from '../type';
import { useRouter } from 'next/navigation';
import { LoginUserInput } from '@repo/zod-config';

export const useLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation<AuthResponse, Error, LoginUserInput>({
    mutationFn: login,

    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      dispatch(setAuth(data));
      router.replace('/');
    },

    onError: (error) => {
      logger.error(error.message);
    },
  });
};
