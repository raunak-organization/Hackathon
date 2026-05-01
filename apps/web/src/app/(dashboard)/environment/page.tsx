import { EnvVarManager } from '@/features/dashboard/components/EnvVarManager';

export default function EnvironmentPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-text-primary">
          Environment Variables
        </h1>
        <p className="text-text-secondary">
          Securely manage your environment keys and secrets.
        </p>
      </div>

      <EnvVarManager />
    </div>
  );
}
