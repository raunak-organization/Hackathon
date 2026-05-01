import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Provider } from 'react-redux';
import { QueryProvider } from '@/providers/QueryProvider';
import { store } from '@/store/app.store';
import React from 'react';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'DevOps Deployment Panel',
  description: 'Manage repositories, deployments, and environment variables',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryProvider>
          <Provider store={store}>{children}</Provider>
        </QueryProvider>
      </body>
    </html>
  );
}
