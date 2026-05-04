'use client';

import { useDeployment } from '../hooks/useDeployment';
import { useDeploymentEnv } from '../hooks/useDeploymentEnv';
import { ArrowLeft, Database, Eye, EyeOff, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

function EnvRow({ envKey, value }: { envKey: string; value: string }) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const isSensitive = /secret|key|token|password|pass|pwd|auth/i.test(envKey);
  const display = isSensitive && !revealed ? '••••••••••••' : value;

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <tr className="border-b border-(--border) last:border-b-0 hover:bg-(--bg-secondary) transition-colors group">
      <td className="p-4 text-(--text-primary) text-[0.85rem] font-medium font-mono">
        {envKey}
      </td>
      <td className="p-4">
        <span className="font-mono text-(--text-primary) text-[0.85rem] tracking-wider">
          {display}
        </span>
      </td>
      <td className="p-4 text-right">
        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
          {isSensitive && (
            <button
              onClick={() => setRevealed((r) => !r)}
              className="text-(--text-secondary) hover:text-(--text-primary) transition-colors"
              title={revealed ? 'Hide' : 'Reveal'}
            >
              {revealed ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
          <button
            onClick={copy}
            className="text-(--text-secondary) hover:text-(--text-primary) transition-colors"
            title="Copy value"
          >
            {copied ? (
              <Check size={16} className="text-green-400" />
            ) : (
              <Copy size={16} />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}

export function EnvPage({ deploymentId }: { deploymentId: string }) {
  const { data: deployment } = useDeployment(deploymentId);
  const { data: envData, isLoading, isError } = useDeploymentEnv(deploymentId);

  const entries = Object.entries(envData?.env ?? {});

  return (
    <div className="mb-10">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/deployment"
            className="text-(--text-secondary) hover:text-(--text-primary) transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <h2 className="text-[1.15rem] font-semibold text-(--text-primary) flex items-center gap-2 tracking-tight m-0">
            <Database size={20} />
            Environment Variables
          </h2>
          {deployment && (
            <span className="text-[0.82rem] text-(--text-secondary) font-mono">
              {deployment.projectName} · v{deployment.version}
            </span>
          )}
        </div>
        {!isLoading && (
          <span className="text-[0.82rem] text-(--text-secondary)">
            {entries.length} variable{entries.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Table — identical structure to EnvVarManager */}
      <div className="w-full bg-(--bg-primary) rounded-(--border-radius) border border-(--border) overflow-hidden overflow-x-auto">
        <table className="w-full border-collapse min-w-[500px]">
          <thead>
            <tr>
              {['Key', 'Value', ''].map((h, i) => (
                <th
                  key={i}
                  className="text-left p-4 bg-(--bg-secondary) text-(--text-secondary) font-medium text-[0.85rem] border-b border-(--border)"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr
                  key={i}
                  className="border-b border-(--border) animate-pulse"
                >
                  <td className="p-4">
                    <div className="h-3 w-32 rounded bg-(--bg-tertiary)" />
                  </td>
                  <td className="p-4">
                    <div className="h-3 w-48 rounded bg-(--bg-tertiary)" />
                  </td>
                  <td className="p-4" />
                </tr>
              ))
            ) : isError ? (
              <tr>
                <td
                  colSpan={3}
                  className="p-8 text-center text-[0.85rem] text-red-400"
                >
                  Failed to load environment variables.
                </td>
              </tr>
            ) : !entries.length ? (
              <tr>
                <td
                  colSpan={3}
                  className="p-10 text-center text-[0.85rem] text-(--text-secondary) opacity-50"
                >
                  No environment variables for this deployment.
                </td>
              </tr>
            ) : (
              entries.map(([k, v]) => <EnvRow key={k} envKey={k} value={v} />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
