'use client';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/features/auth/services/auth.api';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/auth.store';

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      useAuthStore.getState().setToken(data.accessToken);
    },
  });
};
