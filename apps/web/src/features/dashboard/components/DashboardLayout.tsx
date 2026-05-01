'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-(--bg-primary)">
      <Sidebar />

      <main className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto p-10">{children}</div>
      </main>
    </div>
  );
};
