'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  GitBranch,
  Activity,
  Settings,
  Database,
  X,
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar = ({ open, onClose }: SidebarProps) => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/', icon: LayoutDashboard },
    { name: 'Projects', href: '/projects', icon: GitBranch },
    { name: 'Deployments', href: '/deployment', icon: Activity },
    { name: 'Environments', href: '/environment', icon: Database },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 flex flex-col
          border-r border-(--border) bg-(--bg-secondary)
          transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:z-auto
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-(--border) text-(--text-primary) font-semibold shrink-0">
          <div className="flex items-center gap-3">
            <Activity size={22} />
            <span>DevOps Panel</span>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden text-(--text-secondary) hover:text-(--text-primary)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1 p-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition
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
        <div className="flex items-center gap-3 p-4 border-t border-(--border) text-sm text-(--text-secondary) cursor-pointer hover:text-(--text-primary) shrink-0">
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-(--text-primary) text-(--bg-primary) text-xs font-bold">
            N
          </div>
          <span>Collapse</span>
        </div>
      </aside>
    </>
  );
};
