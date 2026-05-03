'use client';
import { FolderGit2, Rocket, CheckCircle, AlertTriangle } from 'lucide-react';
import { useDashboardStats } from '../hooks/useDashboardStats';

export const StatsCards = () => {
  const { data, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 rounded-(--border-radius) border border-(--border) bg-(--bg-primary) animate-pulse"
          />
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: 'Projects',
      value: data?.stats.totalProjects ?? 0,
      icon: FolderGit2,
      color: 'text-blue-400',
    },
    {
      title: 'Deployments',
      value: data?.stats.totalDeployments ?? 0,
      icon: Rocket,
      color: 'text-purple-400',
    },
    {
      title: 'Successful',
      value: data?.stats.successfulDeployments ?? 0,
      icon: CheckCircle,
      color: 'text-green-400',
    },
    {
      title: 'Failed',
      value: data?.stats.failedDeployments ?? 0,
      icon: AlertTriangle,
      color: 'text-red-400',
    },
  ];

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
