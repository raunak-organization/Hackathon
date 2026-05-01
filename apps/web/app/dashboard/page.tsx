import React from 'react';
import { RepositoryList } from '../../features/dashboard/components/RepositoryList';
import { DeploymentPipeline } from '../../features/dashboard/components/DeploymentPipeline';
import { LogsTerminal } from '../../features/dashboard/components/LogsTerminal';
import { EnvVarManager } from '../../features/dashboard/components/EnvVarManager';

export default function Dashboard() {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            margin: 0,
            color: 'var(--text-primary)',
          }}
        >
          Dashboard Overview
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Monitor your active deployments, repository statuses, and system logs.
        </p>
      </div>

      {/* Top Grid: Pipeline and Logs take up the first visual area */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem',
        }}
      >
        <DeploymentPipeline />
        <LogsTerminal />
      </div>

      {/* Middle Section: Repositories */}
      <RepositoryList />

      {/* Bottom Section: Environment Variables */}
      <EnvVarManager />
    </div>
  );
}
