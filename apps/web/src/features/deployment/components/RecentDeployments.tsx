'use client';

import {
  Rocket,
  Clock,
  ExternalLink,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useDeployments } from '../hooks/useDeployments';
import { useRollbackDeployment } from '../hooks/useRollbackDeployments';
import type { DeploymentStatus } from '../type';

interface StatusConfig {
  dot: string;
  label: string;
  badge: string;
}

const STATUS_CONFIG: Record<DeploymentStatus, StatusConfig> = {
  success: {
    dot: 'bg-green-400',
    label: 'Success',
    badge: 'bg-[rgba(34,197,94,0.1)] text-green-400',
  },
  failed: {
    dot: 'bg-red-400',
    label: 'Failed',
    badge: 'bg-[rgba(239,68,68,0.1)] text-red-400',
  },
  building: {
    dot: 'bg-blue-400 animate-pulse',
    label: 'Building',
    badge: 'bg-[rgba(59,130,246,0.1)] text-[#3b82f6]',
  },
  pending: {
    dot: 'bg-yellow-400 animate-pulse',
    label: 'Pending',
    badge: 'bg-[rgba(234,179,8,0.1)] text-yellow-400',
  },
};

function StatusBadge({ status }: { status: DeploymentStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${cfg.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function SkeletonRow() {
  return (
    <tr className="border-b border-(--border) last:border-b-0 animate-pulse">
      <td className="p-4">
        <div className="h-3.5 w-32 rounded bg-(--bg-tertiary) mb-2" />
        <div className="h-2.5 w-48 rounded bg-(--bg-tertiary)" />
      </td>
      <td className="p-4">
        <div className="h-5 w-16 rounded bg-(--bg-tertiary)" />
      </td>
      <td className="p-4">
        <div className="h-3 w-28 rounded bg-(--bg-tertiary)" />
      </td>
      <td className="p-4">
        <div className="h-3 w-24 rounded bg-(--bg-tertiary)" />
      </td>
    </tr>
  );
}

export function RecentDeployments() {
  const { data: deployments = [], isLoading, isError } = useDeployments();
  const {
    mutateAsync: rollback,
    isPending: isRollingBack,
    error: rollbackError,
    variables: rollbackingId,
  } = useRollbackDeployment();

  const handleRollback = async (id: string) => {
    if (!window.confirm('Roll back to the previous successful deployment?'))
      return;
    await rollback(id).catch(() => {});
  };

  if (isLoading) {
    return (
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Rocket size={20} className="text-(--text-secondary)" />
          <div className="h-5 w-44 rounded bg-(--bg-tertiary) animate-pulse" />
        </div>
        <div className="w-full bg-(--bg-primary) rounded-(--border-radius) border border-(--border) overflow-hidden">
          <table className="w-full border-collapse min-w-[600px]">
            <tbody>
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mb-10">
        <h2 className="text-[1.15rem] font-semibold mb-5 text-(--text-primary) flex items-center gap-2 tracking-tight">
          <Rocket size={20} />
          Recent Deployments
        </h2>
        <div className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-10 flex flex-col items-center gap-3 text-center">
          <AlertCircle size={24} className="text-red-400" />
          <p className="text-sm text-(--text-secondary)">
            Failed to load deployments.
          </p>
        </div>
      </div>
    );
  }

  if (!deployments.length) {
    return (
      <div className="mb-10">
        <h2 className="text-[1.15rem] font-semibold mb-5 text-(--text-primary) flex items-center gap-2 tracking-tight">
          <Rocket size={20} />
          Recent Deployments
        </h2>
        <div className="bg-(--bg-primary) border border-(--border) rounded-(--border-radius) p-10 text-center">
          <Rocket
            size={32}
            className="mx-auto mb-3 text-(--text-secondary) opacity-40"
          />
          <p className="text-sm text-(--text-secondary)">No deployments yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[1.15rem] font-semibold text-(--text-primary) flex items-center gap-2 tracking-tight">
          <Rocket size={20} />
          Recent Deployments
        </h2>
        <span className="text-[0.82rem] text-(--text-secondary)">
          {deployments.length} total
        </span>
      </div>

      <div className="w-full bg-(--bg-primary) rounded-(--border-radius) border border-(--border) overflow-hidden overflow-x-auto">
        <table className="w-full border-collapse min-w-[640px]">
          <thead>
            <tr>
              {['Project', 'Status', 'Time', 'Actions'].map((h) => (
                <th
                  key={h}
                  className="text-left p-4 bg-(--bg-secondary) text-(--text-secondary) font-medium text-[0.85rem] border-b border-(--border)"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {deployments.map((d) => {
              const isThisRollingBack =
                isRollingBack && rollbackingId === d._id;
              const hasRollbackError =
                !!rollbackError && rollbackingId === d._id;

              return (
                <tr
                  key={d._id}
                  className="border-b border-(--border) last:border-b-0 hover:bg-(--bg-secondary) transition-colors"
                >
                  {/* Project */}
                  <td className="p-4">
                    <p className="text-[0.85rem] font-medium text-(--text-primary) truncate max-w-[200px]">
                      {d.projectName}
                    </p>
                    <p className="text-[0.75rem] text-(--text-secondary) font-mono truncate max-w-[200px] mt-0.5">
                      {d.repoUrl} · v{d.version}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <StatusBadge status={d.status} />
                  </td>

                  {/* Time */}
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-[0.82rem] text-(--text-secondary)">
                      <Clock size={13} className="shrink-0" />
                      {new Date(d.createdAt).toLocaleString()}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3 text-[0.82rem] text-(--text-secondary)">
                        <Link
                          href={`/deployment/${d._id}/logs`}
                          className="hover:text-(--text-primary) transition-colors"
                        >
                          Logs
                        </Link>
                        <span className="opacity-25">·</span>
                        <Link
                          href={`/deployment/${d._id}/env`}
                          className="hover:text-(--text-primary) transition-colors"
                        >
                          Env
                        </Link>
                        <span className="opacity-25">·</span>

                        {d.version === 1 ? (
                          <span
                            className="text-(--text-secondary) opacity-30 cursor-not-allowed select-none"
                            title="No previous version to roll back to"
                          >
                            Rollback
                          </span>
                        ) : (
                          <button
                            onClick={async () => await handleRollback(d._id)}
                            disabled={isThisRollingBack}
                            className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-40"
                          >
                            {isThisRollingBack ? (
                              <span className="flex items-center gap-1">
                                <Loader2 size={11} className="animate-spin" />
                                Rolling back
                              </span>
                            ) : (
                              'Rollback'
                            )}
                          </button>
                        )}

                        {d.deployUrl && (
                          <>
                            <span className="opacity-25">·</span>
                            <Link
                              href={`${process.env.NEXT_PUBLIC_DEPLOY_URL ?? ''}${d.deployUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="opacity-50 hover:opacity-100 transition-opacity"
                            >
                              <ExternalLink size={13} />
                            </Link>
                          </>
                        )}
                      </div>

                      {hasRollbackError && (
                        <p className="text-[11px] text-red-400">
                          No previous successful deployment to roll back to.
                        </p>
                      )}
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
}
