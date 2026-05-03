import React from 'react';
import { DashboardLayout as DashboardLayoutComponent } from '@/shared/layout/DashboardLayout';
import { AuthGuard } from '@/features/auth/guards/AuthGuard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <DashboardLayoutComponent>{children}</DashboardLayoutComponent>
    </AuthGuard>
  );
}
