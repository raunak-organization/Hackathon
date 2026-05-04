'use client';
import { Hexagon, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { loginUserSchema, registerUserSchema } from '@repo/zod-config';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GithubLoginButton } from './GithubLoginButton';
import { Input } from '@/shared/ui/Input';
import Link from 'next/link';
import { Button } from '@/shared/ui/Button';
import axios from 'axios';
import { FormValues, Props } from '../types';

export default function AuthForm({ type, onSubmit, isLoading }: Props) {
  const isLogin = type === 'login';

  const schema = isLogin ? loginUserSchema : registerUserSchema;
  const [backendError, setBackendError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (data: FormValues) => {
    setBackendError(null);
    try {
      if (type === 'register') {
        if (!data.name) {
          setBackendError('Name is required');
          return;
        }

        await onSubmit({
          name: data.name,
          email: data.email,
          password: data.password,
        });
      } else {
        await onSubmit({
          email: data.email,
          password: data.password,
        });
      }
    } catch (err) {
      let message = 'Something went wrong';

      if (axios.isAxiosError(err)) {
        const data = err.response?.data as {
          message?: string;
        };
        message = data?.message ?? err.message;
      }

      setBackendError(message);
    }
  };

  return (
    <div
      className={
        'bg-bg-secondary border border-border rounded-xl p-10 w-full max-w-[440px] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.4),0_10px_10px_-5px_rgba(0,0,0,0.2)]'
      }
    >
      <div className="flex items-center justify-center gap-2 mb-8 font-bold text-xl text-text-primary [&>svg]:text-accent-blue">
        <Hexagon size={32} />
        <span>DevOps Panel</span>
      </div>

      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <h1 className="text-2xl font-semibold m-0 mb-2 tracking-tight">
          {isLogin ? 'Welcome back' : 'Create an account'}
        </h1>
        <p className="text-text-secondary text-[0.95rem] m-0 leading-relaxed">
          {isLogin
            ? 'Enter your credentials to access your account'
            : 'Enter your details to get started'}
        </p>
      </div>

      {backendError && (
        <div className="mb-6 p-3 bg-[rgba(239,68,68,0.1)] border border-(--accent-red) rounded-(--border-radius) text-(--accent-red) text-sm">
          {backendError}
        </div>
      )}

      <div className="mb-6 flex flex-col gap-3">
        <GithubLoginButton text="Continue with GitHub" />
      </div>

      <div className="flex items-center text-center mb-6 before:content-[''] before:flex-1 before:border-b before:border-border after:content-[''] after:flex-1 after:border-b after:border-border">
        <span className="px-4 text-text-secondary text-sm font-medium">
          or continue with email
        </span>
      </div>

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {!isLogin && (
          <Input
            id="name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            {...register('name')}
            error={errors.name?.message}
            leftIcon={<User size={16} />}
          />
        )}

        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="you@company.com"
          {...register('email')}
          error={errors.email?.message}
          leftIcon={<Mail size={16} />}
        />

        <div className="relative">
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
            leftIcon={<Lock size={16} />}
          />
          {isLogin && (
            <Link
              type="button"
              className="absolute top-0 right-0 text-[0.8rem] text-accent-blue font-medium bg-transparent border-none cursor-pointer hover:underline"
              href="/auth/reset-password"
            >
              Forgot password?
            </Link>
          )}
        </div>

        <div className="mt-2">
          <Button
            type="submit"
            fullWidth
            size="lg"
            isLoading={isLoading || isSubmitting}
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
        </div>
      </form>

      <div className="mt-8 flex items-center justify-center gap-2 text-[0.9rem]">
        <span className="text-text-secondary">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
        </span>
        <Link
          href={isLogin ? '/auth/register' : '/auth/login'}
          className="text-text-primary font-semibold transition-colors hover:opacity-75"
        >
          {isLogin ? 'Sign up' : 'Sign in'}
        </Link>
      </div>
    </div>
  );
}
