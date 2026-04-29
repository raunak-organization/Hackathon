import client from '../../../lib/client';
import type { AuthResponse, LoginPayload, RegisterPayload } from '../type';

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await client.post<AuthResponse>('/auth/login', payload);
  return response.data;
};

export const register = async (
  payload: RegisterPayload,
): Promise<AuthResponse> => {
  const response = await client.post<AuthResponse>('/auth/register', payload);
  return response.data;
};

export const refresh = async (): Promise<AuthResponse> => {
  const response = await client.post<AuthResponse>('/auth/refresh');
  return response.data;
};

export const logout = async (): Promise<{ message: string }> => {
  const response = await client.post<{ message: string }>('/auth/logout');
  return response.data;
};
