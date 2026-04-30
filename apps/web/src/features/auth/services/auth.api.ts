import client from '@/lib/client';
import type { AuthResponse, MeResponse } from '../type';
import { LoginUserInput, RegisterUserInput } from '@repo/zod-config';

export const login = async (payload: LoginUserInput): Promise<AuthResponse> => {
  const response = await client.post<AuthResponse>('/auth/login', payload);
  return response.data;
};

export const register = async (
  payload: RegisterUserInput,
): Promise<AuthResponse> => {
  const response = await client.post<AuthResponse>('/auth/register', payload);
  return response.data;
};

export const getMe = async (): Promise<MeResponse> => {
  const response = await client.get<MeResponse>('/auth/get-me');
  return response.data;
};

export const logout = async (): Promise<{ message: string }> => {
  const response = await client.post<{ message: string }>('/auth/logout');
  return response.data;
};
