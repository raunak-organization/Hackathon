'use client';

import React, { useState } from 'react';
import { Search, Edit2, Trash2, Shield } from 'lucide-react';
import { Card } from '../../../components/Card';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

const MOCK_USERS = [
  {
    id: 1,
    name: 'Alice Freeman',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2 mins ago',
  },
  {
    id: 2,
    name: 'Bobby Singer',
    email: 'bobby@example.com',
    role: 'Developer',
    status: 'Active',
    lastLogin: '1 hour ago',
  },
  {
    id: 3,
    name: 'Charlie Bradbury',
    email: 'charlie@example.com',
    role: 'Viewer',
    status: 'Inactive',
    lastLogin: '3 days ago',
  },
  {
    id: 4,
    name: 'Dean Winchester',
    email: 'dean@example.com',
    role: 'Developer',
    status: 'Active',
    lastLogin: '5 mins ago',
  },
  {
    id: 5,
    name: 'Sam Winchester',
    email: 'sam@example.com',
    role: 'Developer',
    status: 'Active',
    lastLogin: '10 mins ago',
  },
];

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Card className="tableCard" padding="none">
        <div className="tableHeader">
          <div>
            <h2 className="tableTitle">User Management</h2>
            <p className="tableSubtitle">
              View and manage all registered users.
            </p>
          </div>
          <div className="tableActions">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search size={16} />}
              className="searchInput"
            />
            <Button leftIcon={<Shield size={16} />}>Invite User</Button>
          </div>
        </div>

        <div className="tableWrapper">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {MOCK_USERS.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="userInfo">
                      <div className="avatar">{user.name.charAt(0)}</div>
                      <div>
                        <div className="userName">{user.name}</div>
                        <div className="userEmail">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="roleBadge">{user.role}</span>
                  </td>
                  <td>
                    <div className="statusWrapper">
                      <div
                        className={`status-dot ${user.status === 'Active' ? 'active success' : 'pending'}`}
                      />
                      <span>{user.status}</span>
                    </div>
                  </td>
                  <td className="lastLogin">{user.lastLogin}</td>
                  <td className="actionsCell">
                    <button className="iconBtn">
                      <Edit2 size={16} />
                    </button>
                    <button className="iconBtn danger">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <style jsx>{`
        .tableHeader {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
          gap: 1rem;
          flex-wrap: wrap;
        }
        .tableTitle {
          font-size: 1.15rem;
          font-weight: 600;
          margin: 0 0 0.25rem 0;
        }
        .tableSubtitle {
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin: 0;
        }
        .tableActions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .searchInput :global(.input) {
          width: 250px;
        }
        .tableWrapper {
          overflow-x: auto;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .table th {
          padding: 1rem 1.5rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
          font-weight: 600;
          border-bottom: 1px solid var(--border);
          background-color: rgba(0, 0, 0, 0.2);
        }
        .table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border);
          vertical-align: middle;
        }
        .table tbody tr {
          transition: var(--transition);
        }
        .table tbody tr:hover {
          background-color: rgba(255, 255, 255, 0.02);
        }
        .userInfo {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-blue), #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: white;
          font-size: 1rem;
        }
        .userName {
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.1rem;
        }
        .userEmail {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .roleBadge {
          display: inline-block;
          padding: 0.25rem 0.6rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
        }
        .statusWrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        .lastLogin {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        .actionsCell {
          text-align: right;
        }
        .iconBtn {
          padding: 0.5rem;
          border-radius: 6px;
          color: var(--text-secondary);
          transition: var(--transition);
          background: transparent;
          border: none;
          cursor: pointer;
        }
        .iconBtn:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }
        .iconBtn.danger:hover {
          background-color: rgba(239, 68, 68, 0.1);
          color: var(--accent-red);
        }
        @media (max-width: 768px) {
          .tableActions {
            width: 100%;
          }
          .searchInput :global(.input) {
            flex: 1;
            width: auto;
          }
        }
      `}</style>
    </>
  );
}
