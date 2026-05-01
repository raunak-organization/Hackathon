import React from 'react';

export default function SettingsPage() {
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
          Settings
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Manage your account and project preferences.
        </p>
      </div>

      <div className="glass-panel">
        <p style={{ color: 'var(--text-secondary)' }}>
          General dashboard and deployment settings will go here.
        </p>
      </div>
    </div>
  );
}
