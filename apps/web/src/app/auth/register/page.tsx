'use client';
import React from 'react';
import AuthForm from '@/features/auth/components/AuthForm';
import { useRegister } from '@/features/auth/hooks/useRegister';
import { RegisterUserInput } from '@repo/zod-config';

export default function RegisterPage() {
  const { mutateAsync, isPending } = useRegister();
  const handleRegister = async (data: RegisterUserInput) => {
    await mutateAsync(data);
  };
  return (
    <AuthForm type="register" onSubmit={handleRegister} isLoading={isPending} />
  );
}
