'use client';

import { Plus, Rocket, KeyRound } from 'lucide-react';

const actions = [
  {
    title: 'Create Project',
    icon: Plus,
  },
  {
    title: 'Deploy App',
    icon: Rocket,
  },
  {
    title: 'Add Environment Variable',
    icon: KeyRound,
  },
  {
    title: 'Connect GitHub',
    icon: KeyRound,
  },
];

export const QuickActions = () => {
  return (
    <div className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-6">
      <h2 className="text-lg font-semibold mb-5">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="flex items-center gap-3 p-4 border border-(--border) rounded-md hover:bg-(--bg-secondary) transition"
            >
              <Icon size={18} />
              {action.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};
