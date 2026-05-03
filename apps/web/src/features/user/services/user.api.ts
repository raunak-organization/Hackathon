import client from '@/lib/client';
import {
  UpdateNamePayload,
  UpdateEmailPayload,
  UpdatePasswordPayload,
  ResetPasswordRequestPayload,
  UserResponse,
  SuccessMessageResponse,
} from '../type';

export const updateName = async (
  payload: UpdateNamePayload,
): Promise<UserResponse> => {
  const { data } = await client.patch<UserResponse>(
    '/user/update-name',
    payload,
  );
  return data;
};

export const updateEmail = async (
  payload: UpdateEmailPayload,
): Promise<UserResponse> => {
  const { data } = await client.patch<UserResponse>(
    '/user/update-email',
    payload,
  );
  return data;
};

export const updatePassword = async (
  payload: UpdatePasswordPayload,
): Promise<SuccessMessageResponse> => {
  const { data } = await client.put<SuccessMessageResponse>(
    '/user/update-password',
    payload,
  );
  return data;
};

export const resetPassword = async (
  payload: ResetPasswordRequestPayload,
): Promise<SuccessMessageResponse> => {
  const { data } = await client.post<SuccessMessageResponse>(
    '/user/reset-password',
    payload,
  );
  return data;
};

export const deleteUser = async (): Promise<SuccessMessageResponse> => {
  const { data } = await client.delete<SuccessMessageResponse>('/user/delete');
  return data;
};
