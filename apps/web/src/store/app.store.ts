import { configureStore } from '@reduxjs/toolkit';
import deploymentReducer from '@/features/deployment/states/deployment.slice';
import userReducer from '@/features/user/states/user.slice';

export const store = configureStore({
  reducer: {
    deployment: deploymentReducer,
    user: userReducer,
  },
});
