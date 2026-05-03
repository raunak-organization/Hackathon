'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, HelpCircle, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-(--border) bg-(--bg-primary)">
      {/* Search */}
      <div className="flex items-center gap-2 w-80 px-3 py-2 rounded-md border border-(--border) bg-(--bg-secondary) focus-within:ring-1 focus-within:ring-neutral-500">
        <Search size={16} className="text-(--text-secondary)" />
        <input
          placeholder="Search..."
          className="w-full bg-transparent outline-none text-sm text-(--text-primary) placeholder:text-(--text-secondary)"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button className="text-(--text-secondary) hover:text-(--text-primary)">
          <HelpCircle size={20} />
        </button>

        <button className="relative text-(--text-secondary) hover:text-(--text-primary)">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile */}
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen((p) => !p)}
            className="w-8 h-8 rounded-full border border-(--border) bg-(--bg-tertiary) text-sm font-semibold"
          >
            JS
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-(--border) bg-(--bg-secondary) shadow-lg overflow-hidden">
              <div className="p-3 border-b border-(--border) text-sm">
                John Smith
              </div>

              <button
                onClick={() => router.push('/user')}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-(--bg-tertiary)"
              >
                <User size={16} />
                Profile
              </button>

              <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-500/10">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
