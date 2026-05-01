import React from 'react';
import { EnvVarManager } from '../../../features/dashboard/components/EnvVarManager';

export default function EnvironmentPage() {
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
          Environment Variables
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Securely manage your environment keys and secrets.
        </p>
      </div>
      <EnvVarManager />
    </div>
  );
}
