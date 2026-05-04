'use client';
import { useState } from 'react';
import { FolderGit2, GitBranch, Rocket, CheckCircle, Loader2 } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { useCreateDeployment } from '@/features/deployment/hooks/useCreateDeployment';

type DeployState = 'idle' | 'deploying' | 'deployed';

export const RecentProjects = () => {
  const { data, isLoading } = useProjects();
  const { mutateAsync } = useCreateDeployment();
  const projects = data?.projects || [];
  const [deployStates, setDeployStates] = useState<Record<string, DeployState>>({});

  if (isLoading) {
    return (
      <div className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-6">
        <div className="flex items-center gap-2 mb-5">
          <FolderGit2 size={18} className="text-(--text-secondary)" />
          <div className="h-5 w-32 rounded bg-(--bg-tertiary) animate-pulse" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between pb-4 border-b border-(--border) last:border-none animate-pulse">
              <div className="space-y-2">
                <div className="h-4 w-28 rounded bg-(--bg-tertiary)" />
                <div className="h-3 w-44 rounded bg-(--bg-tertiary)" />
              </div>
              <div className="h-8 w-20 rounded bg-(--bg-tertiary)" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-6 text-center">
        <div className="flex items-center gap-2 text-sm text-(--text-secondary) justify-center">
          <FolderGit2 size={18} />
          No projects found
        </div>
      </div>
    );
  }

  const handleDeploy = async (projectId: string, repoUrl: string) => {
    setDeployStates((prev) => ({ ...prev, [projectId]: 'deploying' }));
    try {
      await mutateAsync({ projectId, repoUrl });
      setDeployStates((prev) => ({ ...prev, [projectId]: 'deployed' }));
      setTimeout(() => {
        setDeployStates((prev) => ({ ...prev, [projectId]: 'idle' }));
      }, 3000);
    } catch {
      setDeployStates((prev) => ({ ...prev, [projectId]: 'idle' }));
    }
  };

  return (
    <div className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-6">
      <div className="flex items-center gap-2 mb-5">
        <FolderGit2 size={18} />
        <h2 className="text-lg font-semibold">Recent Projects</h2>
      </div>

      <div className="space-y-4">
        {projects.map((project) => {
          const state = deployStates[project._id] ?? 'idle';
          const isDeploying = state === 'deploying';
          const isDeployed = state === 'deployed';

          return (
            <div
              key={project._id}
              className="flex items-center justify-between border-b border-(--border) pb-4 last:border-none"
            >
              <div className="min-w-0 mr-4">
                <p className="font-medium text-(--text-primary) truncate">{project.name}</p>
                <div className="flex items-center gap-2 text-sm text-(--text-secondary) mt-0.5">
                  <GitBranch size={13} className="shrink-0" />
                  <span className="truncate text-xs">{project.repoUrl}</span>
                </div>
              </div>

              <button
                onClick={() => handleDeploy(project._id, project.repoUrl)}
                disabled={isDeploying || isDeployed}
                className={`
                  shrink-0 text-xs inline-flex items-center justify-center gap-1.5
                  px-3 py-1.5 rounded-md font-medium transition-all duration-200
                  ${isDeployed
                    ? 'bg-green-500/15 text-green-400 border border-green-500/30 cursor-default'
                    : isDeploying
                      ? 'bg-(--bg-tertiary) text-(--text-secondary) cursor-not-allowed opacity-70'
                      : 'bg-(--text-primary) text-(--bg-primary) hover:opacity-90 active:scale-95'
                  }
                `}
              >
                {isDeployed ? (
                  <><CheckCircle size={12} /> Deployed</>
                ) : isDeploying ? (
                  <><Loader2 size={12} className="animate-spin" /> Deploying…</>
                ) : (
                  <><Rocket size={12} /> Deploy</>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
