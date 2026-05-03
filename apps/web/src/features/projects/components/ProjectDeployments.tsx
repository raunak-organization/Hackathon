'use client';
import { useParams } from 'next/navigation';
import { Rocket } from 'lucide-react';
import { useProjectDeployment } from '../hooks/useProjectDeployment';
import Link from 'next/link';
import { Deployment } from '../types';

export const ProjectDeployments = () => {
  const params = useParams();
  const projectId = params.projectId as string;

  const { data, isLoading } = useProjectDeployment(projectId);

  const deployments = data?.deployments || [];

  if (isLoading) {
    return <div>Loading deployments...</div>;
  }

  return (
    <div className="bg-(--bg-primary) border border-(--border) rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Rocket size={18} />
        <h2 className="text-lg font-semibold">Deployment History</h2>
      </div>

      <div className="space-y-4">
        {deployments.map((deployment: Deployment) => (
          <div
            key={deployment._id}
            className="flex justify-between items-center border-b border-(--border) pb-4"
          >
            <div>
              <p className="font-medium">Version v{deployment.version}</p>

              <p className="text-sm text-(--text-secondary)">
                {deployment.status}
              </p>
            </div>

            {deployment.deployUrl && (
              <Link
                href={process.env.NEXT_PUBLIC_DEPLOY_URL + deployment.deployUrl}
                target="_blank"
                className="text-sm text-blue-400"
              >
                Visit
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
