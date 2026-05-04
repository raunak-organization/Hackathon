import { LogsPage } from '@/features/deployment/components/LogsPage';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ deploymentId?: string }>;
}) {
  const { deploymentId } = await params;

  if (!deploymentId) return notFound();

  return <LogsPage deploymentId={deploymentId} />;
}
