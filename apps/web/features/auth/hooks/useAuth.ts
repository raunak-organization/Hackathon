import { useDispatch } from 'react-redux';
import { login, logout, refresh, register } from '../services/api';
import type { LoginPayload, RegisterPayload } from '../type';

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async (payload: RegisterPayload): Promise<void> => {
    try {
      const data = await register(payload);
      dispatch({ type: 'auth/loginSuccess', payload: data });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred';
      dispatch({ type: 'auth/loginFailure', payload: errorMessage });
    }
  };

  const handleLogin = async (payload: LoginPayload): Promise<void> => {
    try {
      const data = await login(payload);
      dispatch({ type: 'auth/loginSuccess', payload: data });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred';
      dispatch({ type: 'auth/loginFailure', payload: errorMessage });
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      dispatch({ type: 'auth/logoutSuccess' });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred';
      dispatch({ type: 'auth/logoutFailure', payload: errorMessage });
    }
  };

  const handleRefresh = async (): Promise<void> => {
    try {
      const data = await refresh();
      dispatch({ type: 'auth/refreshSuccess', payload: data });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred';
      dispatch({ type: 'auth/refreshFailure', payload: errorMessage });
    }
  };

  return { handleLogin, handleLogout, handleRefresh, handleRegister };
};
