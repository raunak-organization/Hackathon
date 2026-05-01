import React from 'react';
import { DeploymentPipeline } from '../../../features/dashboard/components/DeploymentPipeline';

export default function DeploymentsPage() {
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
          Deployments
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Monitor your active CI/CD deployment pipelines.
        </p>
      </div>
      <DeploymentPipeline />
    </div>
  );
}
