'use client';

import { FolderGit2, Rocket, CheckCircle, AlertTriangle } from 'lucide-react';

const stats = [
  {
    title: 'Projects',
    value: '12',
    icon: FolderGit2,
    color: 'text-blue-400',
  },
  {
    title: 'Deployments',
    value: '48',
    icon: Rocket,
    color: 'text-purple-400',
  },
  {
    title: 'Successful',
    value: '41',
    icon: CheckCircle,
    color: 'text-green-400',
  },
  {
    title: 'Failed',
    value: '7',
    icon: AlertTriangle,
    color: 'text-red-400',
  },
];

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-6 hover:bg-(--bg-secondary) transition"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-(--text-secondary)">
                {item.title}
              </span>

              <Icon size={18} className={item.color} />
            </div>

            <h3 className="text-3xl font-bold text-(--text-primary)">
              {item.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
};
