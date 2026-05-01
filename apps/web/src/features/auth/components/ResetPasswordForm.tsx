'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Hexagon, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Input } from '@/ui/Input';
import { Button } from '@/ui/Button';

export function ResetPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSuccess(true);
  };

  return (
    <div className="w-full max-w-[440px] rounded-xl border border-border bg-bg-secondary p-10 shadow-xl">
      {isSuccess ? (
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 text-green-500 animate-in zoom-in-75 duration-300">
            <CheckCircle2 size={48} />
          </div>

          <h1 className="text-2xl font-semibold mb-2">Check your email</h1>

          <p className="text-text-secondary text-sm leading-relaxed">
            We have sent a password reset link to <br />
            <strong className="text-text-primary">{email}</strong>
          </p>

          <div className="mt-8 w-full">
            <Button fullWidth onClick={() => router.push('/auth/login')}>
              Return to Login
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8 text-lg font-bold text-text-primary">
            <Hexagon size={28} className="text-blue-500" />
            DevOps Panel
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold mb-2 tracking-tight">
              Reset Password
            </h1>
            <p className="text-text-secondary text-sm leading-relaxed">
              Enter your email and we’ll send you a reset link.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              id="email"
              label="Email Address"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              leftIcon={<Mail size={16} />}
            />

            <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
              Send Reset Link
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => router.push('/auth/login')}
              className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition"
            >
              <ArrowLeft size={14} />
              Back to Login
            </button>
          </div>
        </>
      )}
    </div>
  );
}
