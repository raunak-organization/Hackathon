'use client';
import React from 'react';
import AuthForm from '@/features/auth/components/AuthForm';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { LoginUserInput } from '@repo/zod-config';

export default function LoginPage() {
  const { mutateAsync, isPending } = useLogin();
  const handleLogin = async (data: LoginUserInput) => {
    await mutateAsync(data);
  };
  return <AuthForm type="login" onSubmit={handleLogin} isLoading={isPending} />;
}
