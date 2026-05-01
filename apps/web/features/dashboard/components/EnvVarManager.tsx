'use client';

import React, { useState } from 'react';
import { Database, Plus, Eye, EyeOff, Trash2 } from 'lucide-react';

const ENV_VARS = [
  {
    id: 1,
    key: 'DATABASE_URL',
    value: 'postgresql://user:password123@db.host.com/main',
    hiddenValue: '*****************',
    env: 'Production',
  },
  {
    id: 2,
    key: 'NEXT_PUBLIC_API_KEY',
    value: 'pk_live_89a2f5d9c1e4b8a7',
    hiddenValue: 'pk_live_89a2...',
    env: 'Production',
  },
  {
    id: 3,
    key: 'REDIS_HOST',
    value: 'redis-cluster.internal',
    hiddenValue: 'redis-cluster.internal',
    env: 'Staging',
  },
];

export const EnvVarManager = () => {
  // Initialize state based on the screenshot representation
  // id 1 is hidden, id 2 is "visible" (shows EyeOff), id 3 is hidden
  const [visibleVars, setVisibleVars] = useState<Record<number, boolean>>({
    2: true,
  });

  const toggleVisibility = (id: number) => {
    setVisibleVars((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-[1.15rem] font-semibold text-[var(--text-primary)] flex items-center gap-2 tracking-tight m-0">
          <Database size={20} />
          Environment Variables
        </h2>
        <button className="bg-[var(--text-primary)] text-[var(--bg-primary)] text-[0.85rem] font-medium px-4 py-2 rounded-md flex items-center gap-2 hover:bg-white transition-colors">
          <Plus size={14} />
          Add Variable
        </button>
      </div>

      <div className="w-full bg-[var(--bg-primary)] rounded-[var(--border-radius)] border border-[var(--border)] overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-4 bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-medium text-[0.85rem] border-b border-[var(--border)]">
                Key
              </th>
              <th className="text-left p-4 bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-medium text-[0.85rem] border-b border-[var(--border)]">
                Value
              </th>
              <th className="text-left p-4 bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-medium text-[0.85rem] border-b border-[var(--border)]">
                Environment
              </th>
              <th className="text-right p-4 bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-medium text-[0.85rem] border-b border-[var(--border)]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {ENV_VARS.map((env) => {
              const isVisible = visibleVars[env.id];
              return (
                <tr
                  key={env.id}
                  className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <td className="p-4 text-[var(--text-primary)] text-[0.85rem] font-medium font-mono">
                    {env.key}
                  </td>
                  <td className="p-4 text-[0.9rem]">
                    <span className="font-mono text-[var(--text-primary)] tracking-wider">
                      {isVisible ? env.value : env.hiddenValue}
                    </span>
                  </td>
                  <td className="p-4 text-[0.9rem]">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        env.env === 'Production'
                          ? 'bg-[rgba(59,130,246,0.1)] text-[#3b82f6]'
                          : 'bg-[rgba(16,185,129,0.1)] text-[#10b981]'
                      }`}
                    >
                      {env.env}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => toggleVisibility(env.id)}
                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button className="text-[var(--accent-red)] hover:bg-[rgba(239,68,68,0.1)] p-1 rounded transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
