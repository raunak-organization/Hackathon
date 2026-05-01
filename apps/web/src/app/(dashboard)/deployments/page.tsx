import { DeploymentPipeline } from '@/features/dashboard/components/DeploymentPipeline';

export default function DeploymentsPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-text-primary">Deployments</h1>
        <p className="text-text-secondary">
          Monitor your active CI/CD deployment pipelines.
        </p>
      </div>

      <DeploymentPipeline />
    </div>
  );
}
