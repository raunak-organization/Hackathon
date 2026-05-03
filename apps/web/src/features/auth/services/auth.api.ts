import client, { RefreshResponse } from '@/lib/client';
import type { AuthResponse, LogoutResponse, MeResponse } from '../types';
import { LoginUserInput, RegisterUserInput } from '@repo/zod-config';

export const login = async (data: LoginUserInput) => {
  const response = await client.post<AuthResponse>('api/auth/login', data);
  console.log('login', response.data);
  return response.data;
};

export const register = async (data: RegisterUserInput) => {
  const response = await client.post<AuthResponse>('api/auth/register', data);
  return response.data;
};

export const getMe = async () => {
  const response = await client.get<MeResponse>('api/auth/get-me');
  return response.data;
};

export const refresh = async () => {
  const response = await client.post<RefreshResponse>('api/auth/refresh');
  console.log('refresh', response.data);
  return response.data;
};

export const logout = async () => {
  const response = await client.post<LogoutResponse>('api/auth/logout');
  return response.data;
};
