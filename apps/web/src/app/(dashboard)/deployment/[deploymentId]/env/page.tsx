// app/deployments/[deploymentId]/env/page.tsx
import { EnvPage } from '@/features/deployment/components/EnvPage';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ deploymentId?: string }>;
}) {
  const { deploymentId } = await params;

  if (!deploymentId) return notFound();

  return <EnvPage deploymentId={deploymentId} />;
}
