import { create } from 'zustand';
import { setAccessToken } from '@/lib/client';
import { logout, refresh } from '../services/auth.api';

type AuthState = {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  init: () => Promise<void>;
  setToken: (token: string | null) => void;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,

  setToken: (token) => {
    setAccessToken(token);
    set({
      accessToken: token,
      isAuthenticated: !!token,
    });
  },

  init: async () => {
    try {
      const res = await refresh();
      const token = res.accessToken;

      setAccessToken(token);

      set({
        accessToken: token,
        isAuthenticated: true,
      });
    } catch {
      setAccessToken(null);
      set({
        accessToken: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await logout();
    } catch {
      // ignore
    }

    setAccessToken(null);
    set({
      accessToken: null,
      isAuthenticated: false,
    });
  },
}));
