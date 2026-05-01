'use client';

import React from 'react';
import { GitBranch, Folder, Clock, PlayCircle } from 'lucide-react';

const MOCK_REPOS = [
  {
    id: 1,
    name: 'frontend-web',
    status: 'success',
    lastDeployed: '2 mins ago',
    branch: 'main',
  },
  {
    id: 2,
    name: 'api-service',
    status: 'pending',
    lastDeployed: '1 hour ago',
    branch: 'staging',
  },
  {
    id: 3,
    name: 'worker-queue',
    status: 'failed',
    lastDeployed: '5 hours ago',
    branch: 'feature/auth',
  },
];

export const RepositoryList = () => {
  return (
    <div className="mb-10">
      <h2 className="text-[1.15rem] font-semibold mb-5 text-[var(--text-primary)] flex items-center gap-2 tracking-tight">
        <Folder size={20} />
        Connected Repositories
      </h2>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
        {MOCK_REPOS.map((repo) => (
          <div
            key={repo.id}
            className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-[var(--border-radius)] p-6 transition-all duration-150 relative hover:border-[#555] hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 hover:bg-[var(--bg-secondary)]"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-[1.05rem] font-semibold text-[var(--text-primary)] flex items-center gap-2 tracking-tight">
                <Folder size={18} />
                {repo.name}
              </div>
              <div
                className={`w-2 h-2 rounded-full active relative ${
                  repo.status === 'success'
                    ? 'bg-[var(--accent-green)] shadow-[0_0_8px_var(--accent-green)]'
                    : repo.status === 'pending'
                      ? 'bg-[var(--accent-amber)] shadow-[0_0_8px_var(--accent-amber)]'
                      : 'bg-[var(--accent-red)] shadow-[0_0_8px_var(--accent-red)]'
                }`}
              >
                {/* The glowing active effect from globals.css is driven by the 'active' class */}
              </div>
            </div>

            <div className="flex items-center gap-4 text-[0.85rem] text-[var(--text-secondary)] mb-6">
              <div className="flex items-center gap-1.5">
                <GitBranch size={14} />
                {repo.branch}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                {repo.lastDeployed}
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-[var(--border)] pt-5">
              <button className="bg-[var(--bg-primary)] text-[var(--text-primary)] px-4 py-2 rounded-md transition-all duration-150 inline-flex items-center gap-2 font-medium border border-[var(--border)] hover:bg-[var(--bg-tertiary)] hover:border-[#404040] text-[0.85rem]">
                View Commits
              </button>
              <button className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-4 py-2 rounded-md transition-all duration-150 inline-flex items-center gap-2 font-medium border border-transparent hover:bg-white hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] text-[0.85rem]">
                <PlayCircle size={14} />
                Deploy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
