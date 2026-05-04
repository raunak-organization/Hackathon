import { StatsCards } from '@/features/dashboard/components/StatsCard';
import { RecentDeployments } from '@/features/projects/components/RecentDeploymenet';
import { ProjectList } from '@/features/projects/components/ProjectList';
import { QuickActions } from '@/features/dashboard/components/QuickAction';

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-6 sm:space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Dashboard Overview
        </h1>
        <p className="text-sm sm:text-base text-text-secondary">
          Manage projects, monitor deployments, and ship faster.
        </p>
      </div>

      <StatsCards />
      <ProjectList />
      <RecentDeployments />
      <QuickActions />
    </div>
  );
}
