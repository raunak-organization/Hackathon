import { DeploymentPipeline } from '@/features/dashboard/components/DeploymentPipeline';
import { EnvVarManager } from '@/features/dashboard/components/EnvVarManager';
import { LogsTerminal } from '@/features/dashboard/components/LogsTerminal';
import { RepositoryList } from '@/features/dashboard/components/RepositoryList';

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-text-primary">
          Dashboard Overview
        </h1>
        <p className="text-text-secondary">
          Monitor your active deployments, repository statuses, and system logs.
        </p>
      </div>

      {/* Top Grid */}
      <div className="grid grid-cols-2 gap-8">
        <DeploymentPipeline />
        <LogsTerminal />
      </div>

      <RepositoryList />
      <EnvVarManager />
    </div>
  );
}
