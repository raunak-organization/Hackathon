'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Hexagon, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

export function ResetPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call for sending reset link
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSuccess(true);
  };

  return (
    <>
      {isSuccess ? (
        <div className="authCard">
          <div className="successIcon">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="title" style={{ textAlign: 'center' }}>
            Check your email
          </h1>
          <p className="subtitle" style={{ textAlign: 'center' }}>
            We have sent a password reset link to <br />
            <strong>{email}</strong>
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Button fullWidth onClick={() => router.push('/auth/login')}>
              Return to Login
            </Button>
          </div>
        </div>
      ) : (
        <div className="authCard">
          <div className="logo">
            <Hexagon size={32} />
            <span>DevOps Panel</span>
          </div>

          <div className="header">
            <h1 className="title">Reset Password</h1>
            <p className="subtitle">
              Enter your email address and we will send you a link to reset your
              password.
            </p>
          </div>

          <form className="form" onSubmit={handleSubmit}>
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

            <div className="submitBtn">
              <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
                Send Reset Link
              </Button>
            </div>
          </form>

          <div
            className="footer"
            style={{ justifyContent: 'center', marginTop: '1.5rem' }}
          >
            <button
              type="button"
              onClick={() => router.push('/auth/login')}
              className="backLink"
            >
              <ArrowLeft size={14} />
              Back to Login
            </button>
          </div>
        </div>
      )}
      <style jsx>{`
        .authCard {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: calc(var(--border-radius) * 1.5);
          padding: 2.5rem;
          width: 100%;
          max-width: 440px;
          box-shadow:
            0 20px 25px -5px rgba(0, 0, 0, 0.4),
            0 10px 10px -5px rgba(0, 0, 0, 0.2);
        }
        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--text-primary);
        }
        .logo :global(svg) {
          color: var(--accent-blue);
        }
        .header {
          margin-bottom: 2rem;
          text-align: center;
        }
        .title {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.02em;
        }
        .subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin: 0;
          line-height: 1.5;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .submitBtn {
          margin-top: 0.5rem;
        }
        .footer {
          margin-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        .backLink {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-weight: 500;
          transition: var(--transition);
          background: transparent;
          border: none;
          cursor: pointer;
        }
        .backLink:hover {
          color: var(--text-primary);
        }
        .successIcon {
          display: flex;
          justify-content: center;
          color: var(--accent-green);
          margin-bottom: 1.5rem;
          animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes scaleIn {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
