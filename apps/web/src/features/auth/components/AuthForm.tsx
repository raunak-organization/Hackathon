'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Hexagon, Mail, Lock, User } from 'lucide-react';
import { Input } from '@/ui/Input';
import { Button } from '@/ui/Button';
import { GithubLoginButton } from './GithubLoginButton';

interface AuthFormProps {
  initialMode?: 'login' | 'register';
  onSuccess?: () => void;
  isModal?: boolean;
}

export function AuthForm({
  initialMode = 'login',
  onSuccess,
  isModal = false,
}: AuthFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLogin = mode === 'login';

  const toggleMode = () => {
    setMode(isLogin ? 'register' : 'login');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);

    if (isLogin) {
      if (email && password) {
        if (onSuccess) onSuccess();
        else router.push('/dashboard');
      }
    } else {
      if (name && email && password) {
        if (onSuccess) onSuccess();
        else router.push('/dashboard');
      }
    }
  };

  return (
    <>
      <div
        className={
          isModal
            ? 'w-full py-4 px-2'
            : 'bg-bg-secondary border border-border rounded-xl p-10 w-full max-w-[440px] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.4),0_10px_10px_-5px_rgba(0,0,0,0.2)]'
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

        <div className="mb-6">
          <GithubLoginButton text="Continue with Github" />
        </div>

        <div className="flex items-center text-center mb-6 before:content-[''] before:flex-1 before:border-b before:border-border after:content-[''] after:flex-1 after:border-b after:border-border">
          <span className="px-4 text-text-secondary text-sm font-medium">
            or continue with email
          </span>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <Input
              id="name"
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLogin}
              leftIcon={<User size={16} />}
            />
          )}

          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            leftIcon={<Mail size={16} />}
          />

          <div className="relative">
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              leftIcon={<Lock size={16} />}
            />
            {isLogin && (
              <button
                type="button"
                className="absolute top-0 right-0 text-[0.8rem] text-accent-blue font-medium bg-transparent border-none cursor-pointer hover:underline"
                onClick={() => router.push('/auth/reset-password')}
              >
                Forgot password?
              </button>
            )}
          </div>

          <div className="mt-2">
            <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </div>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-[0.9rem]">
          <span className="text-text-secondary">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </span>
          <button
            type="button"
            onClick={toggleMode}
            className="text-text-primary font-semibold transition-colors bg-transparent border-none cursor-pointer hover:text-accent-blue"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </>
  );
}
