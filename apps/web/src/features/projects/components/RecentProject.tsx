'use client';
import { FolderGit2, GitBranch } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';

export const RecentProjects = () => {
  const { data, isLoading } = useProjects();
  const projects = data?.projects || [];

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  if (!projects.length) {
    return (
      <div className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-6 text-center">
        <div className="flex items-center gap-2 text-sm text-(--text-secondary)">
          <FolderGit2 size={18} />
          No projects found
        </div>
      </div>
    );
  }

  return (
    <div className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-6">
      <div className="flex items-center gap-2 mb-5">
        <FolderGit2 size={18} />
        <h2 className="text-lg font-semibold">Recent Projects</h2>
      </div>

      <div className="space-y-4">
        {projects.map((project, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-(--border) pb-4 last:border-none"
          >
            <div>
              <p className="font-medium text-(--text-primary)">
                {project.name}
              </p>

              <div className="flex items-center gap-2 text-sm text-(--text-secondary)">
                <GitBranch size={14} />
                {project.repoUrl}
              </div>
            </div>

            <button className="bg-(--text-primary) text-(--bg-primary) px-4 py-2 rounded-md text-sm font-medium hover:bg-white transition">
              Deploy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
