import React from 'react';
import { RepositoryList } from '../../../features/dashboard/components/RepositoryList';

export default function RepositoriesPage() {
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
          Repositories
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Manage and deploy your connected Git repositories.
        </p>
      </div>
      <RepositoryList />
    </div>
  );
}
