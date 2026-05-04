import { RecentDeployments } from '@/features/deployment/components/RecentDeployments';

export default function DeploymentsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
          Deployments
        </h1>
        <p className="text-sm text-text-secondary">
          Monitor your active CI/CD deployment pipelines.
        </p>
      </div>
      <RecentDeployments />
    </div>
  );
}
