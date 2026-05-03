import { ProjectDeployments } from '@/features/projects/components/ProjectDeployments';

export default function ProjectDetailsPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Project Details</h1>
        <p className="text-text-secondary">
          Monitor deployments for this project.
        </p>
      </div>

      <ProjectDeployments />
    </div>
  );
}
