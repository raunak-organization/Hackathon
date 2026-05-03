'use client';

import { Rocket, Clock } from 'lucide-react';

const deployments = [
  {
    project: 'frontend-web',
    status: 'success',
    time: '2 mins ago',
  },
  {
    project: 'api-service',
    status: 'pending',
    time: '10 mins ago',
  },
  {
    project: 'worker-service',
    status: 'failed',
    time: '1 hour ago',
  },
];

export const RecentDeployments = () => {
  return (
    <div className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-6">
      <div className="flex items-center gap-2 mb-5">
        <Rocket size={18} />
        <h2 className="text-lg font-semibold">Recent Deployments</h2>
      </div>

      <div className="space-y-1">
        {deployments.map((deployment, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-(--border) pb-4 last:border-none"
          >
            <div>
              <p className="font-medium text-(--text-primary)">
                {deployment.project}
              </p>

              <div className="flex items-center gap-2 text-sm text-(--text-secondary)">
                <Clock size={14} />
                {deployment.time}
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded text-xs font-medium ${
                deployment.status === 'success'
                  ? 'bg-green-500/10 text-green-400'
                  : deployment.status === 'pending'
                    ? 'bg-yellow-500/10 text-yellow-400'
                    : 'bg-red-500/10 text-red-400'
              }`}
            >
              {deployment.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
