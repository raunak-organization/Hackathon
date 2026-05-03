'use client';
import React from 'react';
import { GitBranch, Folder } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import Link from 'next/link';
import { Button } from '@/shared/ui/Button';
import { useCreateDeployment } from '@/features/deployment/hooks/useCreateDeployment';

export const ProjectList = () => {
  const { data, isLoading } = useProjects();
  const { mutateAsync } = useCreateDeployment();
  const projects = data?.projects || [];

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  if (!projects.length) {
    return (
      <div className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-6 text-center">
        <div className="flex items-center gap-2 text-sm text-(--text-secondary)">
          <Folder size={18} />
          No projects found
        </div>
      </div>
    );
  }

  const handleDeploy = async (projectId: string, repoUrl: string) => {
    await mutateAsync({
      projectId,
      repoUrl,
    });
  };

  return (
    <div className="mb-10">
      <h2 className="text-[1.15rem] font-semibold mb-5 text-(--text-primary) flex items-center gap-2 tracking-tight">
        <Folder size={20} />
        Connected Projects
      </h2>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-6 transition-all duration-150 relative hover:border-[#555] hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 hover:bg-(--bg-secondary)"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-[1.05rem] font-semibold text-(--text-primary) flex items-center gap-2 tracking-tight">
                <Folder size={18} />
                {project.name}
              </div>
              <Button
                onClick={async () => handleDeploy(project._id, project.repoUrl)}
                className="text-xs inline-flex items-center justify-center  bg-(--text-primary) text-(--bg-primary) px-2 py-1 rounded-md"
              >
                Deploy
              </Button>
            </div>

            <div className="flex items-center gap-2 text-[0.85rem] text-(--text-secondary) mb-6">
              <div className="flex items-center gap-1.5">
                <GitBranch size={14} />
                {project.repoUrl}
              </div>
            </div>
            <Link href={`/projects/${project._id}`}>
              <Button className="inline-flex items-center justify-center w-full bg-(--text-primary) text-(--bg-primary) px-4 py-2 rounded-md text-sm font-medium">
                View Deployments
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
