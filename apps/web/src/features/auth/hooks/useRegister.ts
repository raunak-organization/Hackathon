'use client';

import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { register } from '@/features/auth/services/auth.api';
import { setAccessToken } from '@/lib/client';
import { setAuth } from '@/features/auth/state/auth.slice';
import logger from '@/lib/logger';
import { AuthResponse } from '../type';
import { useRouter } from 'next/navigation';
import { RegisterUserInput } from '@repo/zod-config';

export const useRegister = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation<AuthResponse, Error, RegisterUserInput>({
    mutationFn: register,

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
