'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { ProjectList } from '@/features/projects/components/ProjectList';
import { CreateProjectModal } from '@/features/projects/components/CreateProjectModal';

export default function ProjectsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Projects</h1>

          <p className="text-text-secondary">
            Manage your repositories and deployments.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-(--text-primary) text-(--bg-primary) px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={16} />
          Create Project
        </button>
      </div>

      <ProjectList />

      <CreateProjectModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
