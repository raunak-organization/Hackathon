import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/states/auth.slice';
import deploymentReducer from '@/features/deployment/states/deployment.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    deployment: deploymentReducer,
  },
});
