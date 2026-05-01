'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className="layout">
        <Sidebar />
        <main className="main">
          <Header />
          <div className="content">{children}</div>
        </main>
      </div>
      <style jsx global>{`
        .layout {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background-color: var(--bg-primary);
        }
        .sidebar {
          width: 260px;
          background-color: var(--bg-secondary);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          transition: width 0.3s ease;
          z-index: 10;
        }
        .sidebarHeader {
          height: 64px;
          display: flex;
          align-items: center;
          padding: 0 1.5rem;
          border-bottom: 1px solid var(--border);
          font-weight: 600;
          font-size: 1.125rem;
          gap: 0.75rem;
          color: var(--text-primary);
        }
        .logo {
          color: var(--text-primary);
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        .nav {
          flex: 1;
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .navItem {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0.75rem;
          border-radius: var(--border-radius);
          color: var(--text-secondary);
          transition: var(--transition);
          font-weight: 500;
          font-size: 0.9rem;
        }
        .navItem:hover {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
        }
        .navItem.active {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
        }
        .sidebarFooter {
          padding: 1.5rem 1rem;
          border-top: 1px solid var(--border);
        }
        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
        }
        .header {
          height: 64px;
          background-color: var(--bg-primary);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          z-index: 5;
        }
        .searchBar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--border-radius);
          padding: 0.4rem 0.75rem;
          width: 320px;
          transition: var(--transition);
        }
        .searchBar:focus-within {
          border-color: #555;
          box-shadow: 0 0 0 1px #555;
        }
        .searchInput {
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          width: 100%;
          font-size: 0.9rem;
        }
        .searchInput::placeholder {
          color: var(--text-secondary);
        }
        .headerActions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .profilePic {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.85rem;
        }
        .content {
          flex: 1;
          overflow-y: auto;
          padding: 2.5rem;
        }
      `}</style>
    </>
  );
};
