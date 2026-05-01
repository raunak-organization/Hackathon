import { configureStore, type EnhancedStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/state/auth.slice';

export const store: EnhancedStore<{
  auth: {
    isAuthenticated: boolean;
    user: {
      id: string;
      name: string;
      email: string;
    } | null;
  };
}> = configureStore({
  reducer: {
    auth: authReducer,
  },
});
