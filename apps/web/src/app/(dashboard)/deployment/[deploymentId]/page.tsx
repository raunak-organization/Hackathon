'use client';

import { useParams } from 'next/navigation';
import { useDeployment } from '@/features/deployment/hooks/useDeployment';
import { useDeploymentLogs } from '@/features/deployment/hooks/useDeploymentLogs';

export default function DeploymentDetailPage() {
  const { deploymentId } = useParams<{ deploymentId: string }>();

  const { data, isLoading } = useDeployment(deploymentId);
  const isBuilding = data?.status === 'building' || data?.status === 'pending';

  const { data: logs } = useDeploymentLogs(deploymentId, isBuilding);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Deployment not found</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{data.projectName}</h1>
      <p>Status: {data.status}</p>
      <p>Version: {data.version}</p>
      <div>
        <h2 className="font-semibold">Logs</h2>
        <pre className="bg-black text-green-400 p-4 rounded text-sm">
          {logs?.logs?.join('\n')}
        </pre>
      </div>
    </div>
  );
}
