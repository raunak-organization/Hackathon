'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, HelpCircle, User, LogOut, Menu, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useMe } from '@/features/auth/hooks/useMe';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const { data: me } = useMe();

  const userName = me?.data?.name ?? 'User';
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    logout();
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-(--border) bg-(--bg-primary) shrink-0 gap-3">
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="lg:hidden text-(--text-secondary) hover:text-(--text-primary) flex-shrink-0 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      {/* Search */}
      <div className="flex items-center gap-2 flex-1 max-w-xs sm:max-w-sm px-3 py-2 rounded-md border border-(--border) bg-(--bg-secondary) focus-within:ring-1 focus-within:ring-neutral-500 transition-shadow">
        <Search size={16} className="text-(--text-secondary) shrink-0" />
        <input
          placeholder="Search..."
          className="w-full bg-transparent outline-none text-sm text-(--text-primary) placeholder:text-(--text-secondary)"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
        <button className="hidden sm:block text-(--text-secondary) hover:text-(--text-primary) transition-colors">
          <HelpCircle size={20} />
        </button>

        <button className="relative text-(--text-secondary) hover:text-(--text-primary) transition-colors">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile dropdown */}
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen((p) => !p)}
            className="w-8 h-8 rounded-full border border-(--border) bg-(--bg-tertiary) text-xs font-bold hover:border-[#555] transition-colors flex items-center justify-center"
            aria-label="Open profile menu"
          >
            {initials}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-52 rounded-lg border border-(--border) bg-(--bg-secondary) shadow-xl overflow-hidden z-50 animate-scaleIn">
              {/* User info */}
              <div className="px-3 py-3 border-b border-(--border)">
                <p className="text-sm font-semibold text-(--text-primary) truncate">{userName}</p>
                <p className="text-xs text-(--text-secondary) truncate">{me?.data?.email ?? ''}</p>
              </div>

              <Link href="/user" onClick={() => setOpen(false)}>
                <button className="flex items-center gap-2 w-full px-3 py-2.5 text-sm hover:bg-(--bg-tertiary) transition-colors text-(--text-primary)">
                  <User size={15} />
                  Account Settings
                </button>
              </Link>

              <div className="border-t border-(--border)">
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-60"
                >
                  {isLoggingOut ? <Loader2 size={15} className="animate-spin" /> : <LogOut size={15} />}
                  {isLoggingOut ? 'Signing out…' : 'Sign Out'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
