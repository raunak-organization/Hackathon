'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  GitBranch,
  Activity,
  Settings,
  Database,
} from 'lucide-react';

export const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/', icon: LayoutDashboard },
    { name: 'Projects', href: '/projects', icon: GitBranch },
    { name: 'Deployments', href: '/deployment', icon: Activity },
    { name: 'Environments', href: '/environment', icon: Database },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 flex flex-col border-r border-(--border) bg-(--bg-secondary)">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-(--border) text-(--text-primary) font-semibold">
        <Activity size={26} />
        DevOps Panel
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition
                ${
                  active
                    ? 'bg-(--bg-tertiary) text-(--text-primary)'
                    : 'text-(--text-secondary) hover:bg-(--bg-tertiary) hover:text-(--text-primary)'
                }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="flex items-center gap-3 p-4 border-t border-(--border) text-sm text-(--text-secondary) cursor-pointer hover:text-(--text-primary)">
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-(--text-primary) text-(--bg-primary) text-xs font-bold">
          N
        </div>
        Collapse
      </div>
    </aside>
  );
};
