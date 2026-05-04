'use client';

import { useDeployment } from '../hooks/useDeployment';
import { useDeploymentLogs } from '../hooks/useDeploymentLogs';
import { ArrowLeft, Terminal, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export function LogsPage({ deploymentId }: { deploymentId: string }) {
  const { data: deployment } = useDeployment(deploymentId);
  const isBuilding =
    deployment?.status === 'building' || deployment?.status === 'pending';

  const {
    data: logsData,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useDeploymentLogs(deploymentId, isBuilding ?? false);

  const logs = logsData?.logs ?? [];

  const LINE_STYLES: Record<string, string> = {
    error: 'text-red-400',
    warn: 'text-yellow-400',
    success: 'text-emerald-400',
    info: 'text-blue-400',
  };

  function classifyLine(line: string): string {
    const l = line.toLowerCase();
    if (l.includes('error') || l.includes('failed') || l.includes('exit code'))
      return LINE_STYLES.error!;
    if (l.includes('warn')) return LINE_STYLES.warn!;
    if (l.includes('success') || l.includes('done') || l.includes('deployed'))
      return LINE_STYLES.success!;
    if (l.includes('info') || l.startsWith('>') || l.includes('building'))
      return LINE_STYLES.info!;
    return 'text-slate-500';
  }

  const handleRefetch = async () => {
    await refetch();
  };

  return (
    <div className="mb-10">
      {/* Header — matches section header pattern */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <Link
          href="/deployment"
          className="text-(--text-secondary) hover:text-(--text-primary) transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>

        <h2 className="text-[1.15rem] font-semibold text-(--text-primary) flex items-center gap-2 tracking-tight m-0">
          <Terminal size={20} />
          Build Logs
        </h2>

        {deployment && (
          <span className="text-[0.82rem] text-(--text-secondary) font-mono">
            {deployment.projectName} · v{deployment.version} ·{' '}
            <span
              className={
                deployment.status === 'success'
                  ? 'text-green-400'
                  : deployment.status === 'failed'
                    ? 'text-red-400'
                    : 'text-yellow-400'
              }
            >
              {deployment.status}
            </span>
          </span>
        )}

        <button
          onClick={handleRefetch}
          disabled={isFetching}
          className="ml-auto bg-(--text-primary) text-(--bg-primary) text-[0.85rem] font-medium px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <RefreshCw size={14} className={isFetching ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {isBuilding && (
        <div className="flex items-center gap-2 text-[0.82rem] text-[#3b82f6] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Live — auto-refreshing every 2s
        </div>
      )}

      {/* Terminal box — intentionally dark, same border/radius system */}
      <div className="w-full bg-(--bg-primary) rounded-(--border-radius) border border-(--border) overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-(--bg-secondary) border-b border-(--border)">
          <Terminal size={14} className="text-(--text-secondary)" />
          <span className="text-[0.82rem] text-(--text-secondary) font-mono">
            stdout / stderr
          </span>
        </div>

        <div className="p-4 font-mono text-[0.8rem] leading-relaxed min-h-[300px] max-h-[60vh] overflow-y-auto space-y-0.5 bg-[#0a0c0f]">
          {isLoading ? (
            <div className="flex items-center gap-2 text-(--text-secondary) opacity-50">
              <RefreshCw size={12} className="animate-spin" /> Loading logs…
            </div>
          ) : isError ? (
            <p className="text-red-400">Failed to load logs.</p>
          ) : !logs.length ? (
            <p className="text-slate-600">No logs yet.</p>
          ) : (
            logs.map((line, i) => (
              <p key={i} className={classifyLine(line)}>
                <span className="select-none text-slate-700 mr-3 tabular-nums">
                  {String(i + 1).padStart(3, '0')}
                </span>
                {line}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
