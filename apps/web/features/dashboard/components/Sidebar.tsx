'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  GitBranch,
  Activity,
  Database,
  Settings,
  TerminalSquare,
} from 'lucide-react';

export const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Repositories', href: '/dashboard/repositories', icon: GitBranch },
    { name: 'Deployments', href: '/dashboard/deployments', icon: Activity },
    { name: 'Environment', href: '/dashboard/environment', icon: Database },
    { name: 'Logs', href: '/dashboard/logs', icon: TerminalSquare },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebarHeader">
        <Activity className="logo" size={28} />
        <span>DevOps Panel</span>
      </div>

      <nav className="nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`navItem ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div
        className="sidebarFooter"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
        }}
      >
        <div
          style={{
            width: '24px',
            height: '24px',
            backgroundColor: 'var(--text-primary)',
            color: 'var(--bg-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            fontWeight: 'bold',
            fontSize: '12px',
          }}
        >
          N
        </div>
        <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>Collapse</span>
      </div>
    </aside>
  );
};
