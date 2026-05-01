'use client';

import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container">{children}</div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 1.5rem;
          background: radial-gradient(
            circle at 50% -20%,
            rgba(59, 130, 246, 0.15),
            transparent 60%
          );
        }
      `}</style>
    </>
  );
}
