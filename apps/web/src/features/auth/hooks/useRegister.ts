'use client';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/features/auth/services/auth.api';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/auth.store';

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: register,

    onSuccess: (data) => {
      useAuthStore.getState().setToken(data.accessToken);
      router.replace('/');
    },
  });
};
