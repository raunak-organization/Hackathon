'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useCreateProject } from '../hooks/useCreateProject';

export const CreateProjectModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [name, setName] = useState('');
  const [repoUrl, setRepoUrl] = useState('');

  const { mutate, isPending } = useCreateProject();

  const handleSubmit = () => {
    mutate(
      { name, repoUrl },
      {
        onSuccess: () => {
          setName('');
          setRepoUrl('');
          onClose();
        },
      },
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="max-w-md bg-(--bg-primary) border border-(--border) rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Create Project</h2>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <input
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 mb-4 bg-(--bg-secondary) border border-(--border) rounded-md"
          />

          <input
            placeholder="Github Repo URL"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="w-full px-4 py-3 mb-4 bg-(--bg-secondary) border border-(--border) rounded-md"
          />

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full bg-(--text-primary) text-(--bg-primary) py-3 rounded-md font-medium"
          >
            {isPending ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </div>
    </div>
  );
};
