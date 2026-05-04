'use client';

import { Rocket, Clock, ExternalLink } from 'lucide-react';
import { useRecentDeployments } from '../hooks/useRecentDeployment';
import Link from 'next/link';

export const RecentDeployments = () => {
  const { data: deployments = [], isLoading } = useRecentDeployments();

  if (isLoading) {
    return (
      <div className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-6">
        <div className="flex items-center gap-2 mb-6">
          <Rocket size={18} className="text-(--text-secondary)" />
          <div className="h-5 w-40 rounded bg-(--bg-tertiary) animate-pulse" />
        </div>
        <div className="space-y-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-(--border) pb-4 last:border-none animate-pulse"
            >
              <div className="space-y-2">
                <div className="h-4 w-36 rounded bg-(--bg-tertiary)" />
                <div className="h-3 w-52 rounded bg-(--bg-tertiary)" />
              </div>
              <div className="h-6 w-20 rounded-full bg-(--bg-tertiary)" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!deployments.length) {
    return (
      <div className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-10 text-center">
        <Rocket size={28} className="mx-auto mb-3 text-(--text-secondary) opacity-40" />
        <p className="text-sm text-(--text-secondary)">No deployments yet. Deploy a project to get started.</p>
      </div>
    );
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'success':
        return {
          classes: 'bg-green-500/10 text-green-400 border border-green-500/20',
          dot: 'bg-green-400',
          pulse: false,
        };
      case 'failed':
        return {
          classes: 'bg-red-500/10 text-red-400 border border-red-500/20',
          dot: 'bg-red-400',
          pulse: false,
        };
      case 'pending':
      case 'building':
        return {
          classes: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
          dot: 'bg-yellow-400',
          pulse: true,
        };
      default:
        return { classes: '', dot: 'bg-zinc-500', pulse: false };
    }
  };

  return (
    <div className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-6">
      <div className="flex items-center gap-2 mb-6">
        <Rocket size={18} />
        <h2 className="text-lg font-semibold">Recent Deployments</h2>
      </div>

      <div className="space-y-4">
        {deployments.map((deployment) => {
          const { classes, dot, pulse } = getStatusConfig(deployment.status);

          return (
            <div
              key={deployment._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-(--border) pb-4 last:border-none"
            >
              <div className="space-y-1.5">
                <p className="font-medium text-(--text-primary)">{deployment.projectName}</p>

                <div className="flex items-center gap-3 text-xs text-(--text-secondary)">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(deployment.createdAt).toLocaleString()}
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-(--bg-tertiary) font-mono">
                    v{deployment.version}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {/* Status badge with pulsing dot for active states */}
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${classes}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${dot} ${pulse ? 'animate-pulse' : ''}`} />
                  {deployment.status}
                </span>

                {deployment.deployUrl && (
                  <Link
                    href={process.env.NEXT_PUBLIC_API_URL + deployment.deployUrl}
                    target="_blank"
                    className="text-(--text-secondary) hover:text-blue-400 transition-colors"
                    title="Open deployment"
                  >
                    <ExternalLink size={15} />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
