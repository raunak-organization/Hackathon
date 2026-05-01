import React from 'react';
import { DashboardLayout as DashboardLayoutComponent } from '../../features/dashboard/components/DashboardLayout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>;
}
