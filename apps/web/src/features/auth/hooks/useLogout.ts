'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '@/features/auth/services/auth.api';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/auth.store';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      useAuthStore.getState().setToken(null);
      queryClient.clear();

      router.replace('/auth/login');
    },
  });
};
