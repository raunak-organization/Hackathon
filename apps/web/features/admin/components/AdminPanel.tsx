'use client';

import React from 'react';
import { Users, Activity, ShieldAlert, Zap } from 'lucide-react';
import { Card } from '../../../components/Card';
import { UserManagement } from './UserManagement';

export function AdminPanel() {
  const stats = [
    {
      title: 'Total Users',
      value: '1,248',
      trend: '+12%',
      icon: <Users size={20} />,
      color: 'var(--accent-blue)',
    },
    {
      title: 'Active Sessions',
      value: '342',
      trend: '+5%',
      icon: <Activity size={20} />,
      color: 'var(--accent-green)',
    },
    {
      title: 'Server Load',
      value: '45%',
      trend: '-2%',
      icon: <Zap size={20} />,
      color: 'var(--accent-amber)',
    },
    {
      title: 'Security Alerts',
      value: '0',
      trend: '0%',
      icon: <ShieldAlert size={20} />,
      color: 'var(--accent-red)',
    },
  ];

  return (
    <>
      <div className="p-8 max-w-[1200px] mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-[1.75rem] font-semibold m-0 mb-2 text-text-primary tracking-tight">
            Admin Overview
          </h1>
          <p className="text-text-secondary m-0">
            Manage your system users, roles, and settings.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 mb-10">
          {stats.map((stat, idx) => (
            <Card key={idx} className="flex items-start gap-4" hoverable>
              <div
                className="p-3 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: `${stat.color}15`,
                  color: stat.color,
                }}
              >
                {stat.icon}
              </div>
              <div className="flex-1">
                <span className="block text-sm text-text-secondary mb-1 font-medium">
                  {stat.title}
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-[1.75rem] font-bold text-text-primary tracking-tight">
                    {stat.value}
                  </span>
                  <span
                    className={`text-sm font-medium ${stat.trend.startsWith('+') ? 'text-accent-green' : 'text-accent-red'}`}
                  >
                    {stat.trend}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="animate-[slideUp_0.4s_ease-out]">
          <UserManagement />
        </div>
      </div>
    </>
  );
}
