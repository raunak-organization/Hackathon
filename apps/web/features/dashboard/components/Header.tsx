'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, HelpCircle, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Modal } from '../../../components/Modal';
import { AuthForm } from '../../auth/components/AuthForm';

export const Header = () => {
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="header">
        <div className="searchBar">
          <Search size={18} color="var(--text-secondary)" />
          <input
            type="text"
            placeholder="Search resources, deployments..."
            className="searchInput"
          />
        </div>

        <div className="headerActions">
          <button style={{ color: 'var(--text-secondary)' }}>
            <HelpCircle size={20} />
          </button>

          <button
            style={{ color: 'var(--text-secondary)', position: 'relative' }}
          >
            <Bell size={20} />
            {/* Notification Badge */}
            <span
              className="statusDot failed active"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 8,
                height: 8,
              }}
            />
          </button>

          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <div
              className="profilePic hover:bg-bg-tertiary transition-colors"
              style={{
                cursor: 'pointer',
                width: isAuthenticated ? '32px' : 'auto',
                padding: isAuthenticated ? '0' : '0 12px',
                borderRadius: isAuthenticated ? '50%' : 'var(--border-radius)',
                border: isAuthenticated
                  ? '1px solid var(--border)'
                  : '1px solid transparent',
                background: isAuthenticated
                  ? 'var(--bg-tertiary)'
                  : 'transparent',
                fontWeight: isAuthenticated ? 600 : 500,
              }}
              onClick={() => {
                if (!isAuthenticated) {
                  setIsAuthModalOpen(true);
                } else {
                  setIsDropdownOpen(!isDropdownOpen);
                }
              }}
            >
              {isAuthenticated ? 'JS' : 'Sign In'}
            </div>

            {/* Profile Dropdown */}
            {isAuthenticated && isDropdownOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-48 bg-bg-secondary border border-border rounded-lg shadow-lg overflow-hidden z-50 flex flex-col"
                style={{
                  animation: 'fadeIn 0.2s ease',
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border)',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                }}
              >
                <div className="p-3 border-b border-border flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center font-semibold text-text-primary">
                    JS
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-primary">
                      John Smith
                    </span>
                    <span className="text-xs text-text-secondary">
                      john@example.com
                    </span>
                  </div>
                </div>

                <div className="p-1">
                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-md transition-colors"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push('/user');
                    }}
                  >
                    <User size={16} />
                    Profile
                  </button>
                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-accent-red hover:bg-red-500/10 rounded-md transition-colors mt-1"
                    onClick={() => {
                      setIsAuthenticated(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Reusable Modal integrated with AuthForm */}
      <Modal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)}>
        <AuthForm
          isModal={true}
          onSuccess={() => {
            setIsAuthenticated(true);
            setIsAuthModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
};
