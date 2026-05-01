'use client';

import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        flex min-h-screen items-center justify-center p-6
        bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.15),transparent_60%)]
      "
    >
      {children}
    </div>
  );
}
