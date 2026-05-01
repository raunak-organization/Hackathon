import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../type';

export interface AuthState {
  user: null | User;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: null | User }>) => {
      state.user = action.payload.user;
    },
    setAuth: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setAuth, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
