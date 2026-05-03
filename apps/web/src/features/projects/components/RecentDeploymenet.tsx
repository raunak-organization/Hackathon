'use client';

import { Rocket, Clock, ExternalLink } from 'lucide-react';
import { useRecentDeployments } from '../hooks/useRecentDeployment';
import Link from 'next/link';

export const RecentDeployments = () => {
  const { data: deployments = [], isLoading } = useRecentDeployments();

  if (isLoading) {
    return (
      <div className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-6">
        Loading deployments...
      </div>
    );
  }

  if (!deployments.length) {
    return (
      <div className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-6">
        <div className="flex items-center gap-2 text-(--text-secondary)">
          <Rocket size={18} />
          No deployments yet
        </div>
      </div>
    );
  }

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500/10 text-green-400 border border-green-500/20';
      case 'failed':
        return 'bg-red-500/10 text-red-400 border border-red-500/20';
      case 'pending':
      case 'building':
        return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
      default:
        return '';
    }
  };

  return (
    <div className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-6">
      <div className="flex items-center gap-2 mb-6">
        <Rocket size={18} />
        <h2 className="text-lg font-semibold">Recent Deployments</h2>
      </div>

      <div className="space-y-4">
        {deployments.map((deployment) => (
          <div
            key={deployment._id}
            className="flex items-center justify-between border-b border-(--border) pb-4 last:border-none"
          >
            <div className="space-y-2">
              <p className="font-medium text-(--text-primary)">
                {deployment.projectName}
              </p>

              <div className="flex items-center gap-3 text-sm text-(--text-secondary)">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {new Date(deployment.createdAt).toLocaleString()}
                </div>

                <span className="text-xs">v{deployment.version}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyles(
                  deployment.status,
                )}`}
              >
                {deployment.status}
              </span>

              {deployment.deployUrl && (
                <Link
                  href={process.env.NEXT_PUBLIC_API_URL + deployment.deployUrl}
                  target="_blank"
                  className="text-blue-400 hover:text-blue-300"
                >
                  <ExternalLink size={16} />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
