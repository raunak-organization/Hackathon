'use client';
import React, { useState } from 'react';
import { GitBranch, Folder, CheckCircle, Rocket, Loader2 } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import Link from 'next/link';
import { Button } from '@/shared/ui/Button';
import { useCreateDeployment } from '@/features/deployment/hooks/useCreateDeployment';

/** Per-project deploy state */
type DeployState = 'idle' | 'deploying' | 'deployed';

export const ProjectList = () => {
  const { data, isLoading } = useProjects();
  const { mutateAsync } = useCreateDeployment();
  const projects = data?.projects || [];

  // Track deploy state per project id
  const [deployStates, setDeployStates] = useState<Record<string, DeployState>>({});

  if (isLoading) {
    return (
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Folder size={20} className="text-(--text-secondary)" />
          <div className="h-5 w-40 rounded bg-(--bg-tertiary) animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 sm:gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-6 space-y-4 animate-pulse"
            >
              <div className="flex justify-between items-center">
                <div className="h-4 w-32 rounded bg-(--bg-tertiary)" />
                <div className="h-7 w-16 rounded bg-(--bg-tertiary)" />
              </div>
              <div className="h-3 w-48 rounded bg-(--bg-tertiary)" />
              <div className="h-9 w-full rounded bg-(--bg-tertiary)" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="mb-10">
        <h2 className="text-[1.15rem] font-semibold mb-5 text-(--text-primary) flex items-center gap-2 tracking-tight">
          <Folder size={20} />
          Connected Projects
        </h2>
        <div className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-10 text-center">
          <Folder size={32} className="mx-auto mb-3 text-(--text-secondary) opacity-40" />
          <p className="text-sm text-(--text-secondary)">No projects connected yet.</p>
        </div>
      </div>
    );
  }

  const handleDeploy = async (projectId: string, repoUrl: string) => {
    setDeployStates((prev) => ({ ...prev, [projectId]: 'deploying' }));
    try {
      await mutateAsync({ projectId, repoUrl });
      setDeployStates((prev) => ({ ...prev, [projectId]: 'deployed' }));
      // Reset back to idle after 3 seconds
      setTimeout(() => {
        setDeployStates((prev) => ({ ...prev, [projectId]: 'idle' }));
      }, 3000);
    } catch {
      setDeployStates((prev) => ({ ...prev, [projectId]: 'idle' }));
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-[1.15rem] font-semibold mb-5 text-(--text-primary) flex items-center gap-2 tracking-tight">
        <Folder size={20} />
        Connected Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 sm:gap-6">
        {projects.map((project) => {
          const state = deployStates[project._id] ?? 'idle';
          const isDeploying = state === 'deploying';
          const isDeployed = state === 'deployed';

          return (
            <div
              key={project._id}
              className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-6 transition-all duration-200 relative hover:border-[#555] hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 hover:bg-(--bg-secondary)"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-[1.05rem] font-semibold text-(--text-primary) flex items-center gap-2 tracking-tight">
                  <Folder size={18} />
                  {project.name}
                </div>

                {/* Deploy button with states */}
                <button
                  onClick={async () => await handleDeploy(project._id, project.repoUrl)}
                  disabled={isDeploying || isDeployed}
                  className={`
                    text-xs inline-flex items-center justify-center gap-1.5
                    px-2.5 py-1.5 rounded-md font-medium transition-all duration-200
                    ${isDeployed
                      ? 'bg-green-500/15 text-green-400 border border-green-500/30 cursor-default'
                      : isDeploying
                        ? 'bg-(--bg-tertiary) text-(--text-secondary) cursor-not-allowed opacity-70'
                        : 'bg-(--text-primary) text-(--bg-primary) hover:opacity-90 active:scale-95'
                    }
                  `}
                >
                  {isDeployed ? (
                    <>
                      <CheckCircle size={12} />
                      Deployed
                    </>
                  ) : isDeploying ? (
                    <>
                      <Loader2 size={12} className="animate-spin" />
                      Deploying…
                    </>
                  ) : (
                    <>
                      <Rocket size={12} />
                      Deploy
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 text-[0.82rem] text-(--text-secondary) mb-6 truncate">
                <GitBranch size={13} className="shrink-0" />
                <span className="truncate">{project.repoUrl}</span>
              </div>

              <Link href={`/projects/${project._id}`}>
                <Button
                  className="inline-flex items-center justify-center w-full bg-(--text-primary) text-(--bg-primary) px-4 py-2 rounded-md text-sm font-medium"
                >
                  View Deployments
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
