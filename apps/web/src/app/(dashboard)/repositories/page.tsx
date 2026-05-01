import { RepositoryList } from '@/features/dashboard/components/RepositoryList';

export default function RepositoriesPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-text-primary">Repositories</h1>
        <p className="text-text-secondary">
          Manage and deploy your connected Git repositories.
        </p>
      </div>

      <RepositoryList />
    </div>
  );
}
