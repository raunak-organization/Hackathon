'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useVerifyEmail } from '@/features/user/hooks/useVerifyEmail';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const hasFired = useRef(false);

  const { mutate: verifyEmail, isError, error } = useVerifyEmail();

  useEffect(() => {
    if (!token || hasFired.current) return;
    hasFired.current = true;
    verifyEmail(token);
  }, [token, verifyEmail]);

  if (isError)
    return (
      <div>
        <p>
          Verification failed: {error?.message ?? 'The link may have expired.'}
        </p>
        <button onClick={() => router.push('/user')}>Go to User Profile</button>
      </div>
    );
  else {
    setTimeout(() => router.push('/user'), 3000);
    return (
      <div>
        <p>
          {' '}
          Your email has been successfully verified it may take some time to
          reflect ! Redirecting to your profile...
        </p>

        <button onClick={() => router.push('/user')}>Go to User Profile</button>
      </div>
    );
  }
}
