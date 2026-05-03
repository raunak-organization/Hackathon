import { configureStore } from '@reduxjs/toolkit';
import deploymentReducer from '@/features/deployment/states/deployment.slice';

export const store = configureStore({
  reducer: {
    deployment: deploymentReducer,
  },
});
