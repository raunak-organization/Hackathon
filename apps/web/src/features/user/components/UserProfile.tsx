'use client';
import { useEffect, useState } from 'react';
import { User, Mail, Lock, Trash2, Shield } from 'lucide-react';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

import { useMe } from '@/features/auth/hooks/useMe';
import { useUpdateName } from '../hooks/useUpdateName';
import { useUpdateEmail } from '../hooks/useUpdateEmail';
import { useUpdatePassword } from '../hooks/useUpdatePassword';
import { useResetPassword } from '../hooks/useResetPassword';
import { useDeleteUser } from '../hooks/useDeleteUser';

export function UserProfile() {
  const { data: user, isLoading } = useMe();

  const updateNameMutation = useUpdateName();
  const updateEmailMutation = useUpdateEmail();
  const updatePasswordMutation = useUpdatePassword();
  const resetPasswordMutation = useResetPassword();
  const deleteUserMutation = useDeleteUser();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (user?.data) {
      setName(user.data.name);
      setEmail(user.data.email);
    }
  }, [user]);

  const handleUpdateName = () => {
    if (!name.trim()) return;

    if (name === user?.data.name) return;

    updateNameMutation.mutate({
      name,
    });
  };

  const handleUpdateEmail = () => {
    if (!email.trim()) return;

    if (email === user?.data.email) return;

    updateEmailMutation.mutate({
      email,
    });
  };

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword) return;

    updatePasswordMutation.mutate(
      {
        oldPassword: currentPassword,
        newPassword,
      },
      {
        onSuccess: () => {
          setCurrentPassword('');
          setNewPassword('');
        },
      },
    );
  };

  const handleResetPassword = () => {
    if (!email) return;

    resetPasswordMutation.mutate({
      email,
    });
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Are you sure you want to permanently delete your account?',
    );

    if (!confirmed) return;

    deleteUserMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="p-8 text-(--text-secondary)">Loading profile...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-(--text-primary)">
          Account Settings
        </h1>

        <p className="text-(--text-secondary) mt-2">
          Manage your account details and security preferences.
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-(--bg-primary) border border-(--border) rounded-2xl overflow-hidden">
        {/* Name Section */}
        <div className="p-4 sm:p-8 border-b border-(--border)">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-(--bg-secondary)">
              <User size={18} />
            </div>

            <div>
              <h2 className="font-semibold text-lg">Personal Information</h2>

              <p className="text-sm text-(--text-secondary)">
                Update your display name
              </p>
            </div>
          </div>

          <div className="max-w-xl">
            <div className="mb-4">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </div>

            <Button
              onClick={handleUpdateName}
              disabled={updateNameMutation.isPending}
            >
              {updateNameMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {/* Email Section */}
        <div className="p-4 sm:p-8 border-b border-(--border)">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-(--bg-secondary)">
              <Mail size={18} />
            </div>

            <div>
              <h2 className="font-semibold text-lg">Email Address</h2>

              <p className="text-sm text-(--text-secondary)">
                Update your login email
              </p>
            </div>
          </div>

          <div className="max-w-xl">
            <div className="mb-4">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>

            <Button
              onClick={handleUpdateEmail}
              disabled={updateEmailMutation.isPending}
            >
              {updateEmailMutation.isPending ? 'Updating...' : 'Update Email'}
            </Button>
          </div>
        </div>

        {/* Password Section */}
        <div className="p-4 sm:p-8 border-b border-(--border)">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-(--bg-secondary)">
              <Lock size={18} />
            </div>

            <div>
              <h2 className="font-semibold text-lg">Password & Security</h2>

              <p className="text-sm text-(--text-secondary)">
                Change your password or reset it
              </p>
            </div>
          </div>

          <div className="max-w-xl">
            <div className="mb-4">
              <Input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <Input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleUpdatePassword}
                disabled={updatePasswordMutation.isPending}
              >
                {updatePasswordMutation.isPending
                  ? 'Updating...'
                  : 'Update Password'}
              </Button>

              <Button
                variant="secondary"
                onClick={handleResetPassword}
                disabled={resetPasswordMutation.isPending}
              >
                {resetPasswordMutation.isPending
                  ? 'Sending...'
                  : 'Reset Password'}
              </Button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-4 sm:p-8 bg-red-500/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
              <Shield size={18} />
            </div>

            <div>
              <h2 className="font-semibold text-lg text-red-400">
                Danger Zone
              </h2>

              <p className="text-sm text-(--text-secondary)">
                Permanently delete your account and all associated data.
              </p>
            </div>
          </div>

          <Button
            onClick={handleDeleteAccount}
            disabled={deleteUserMutation.isPending}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <Trash2 size={16} />

            {deleteUserMutation.isPending ? 'Deleting...' : 'Delete Account'}
          </Button>
        </div>
      </div>
    </div>
  );
}
