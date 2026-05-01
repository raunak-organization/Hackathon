import client from '@/lib/client';
import {
  CreateDeploymentPayload,
  Deployment,
  LogsResponse,
  RollbackResponse,
} from '../type';

export const getAllDeployments = async (): Promise<Deployment[]> => {
  const { data } = await client.get<Deployment[]>('/deploy');
  return data;
};

export const createDeployment = async (
  payload: CreateDeploymentPayload,
): Promise<Deployment> => {
  const { data } = await client.post<Deployment>('/deploy', payload);
  return data;
};

export const getDeploymentById = async (id: string): Promise<Deployment> => {
  const { data } = await client.get<Deployment>(`/deploy/${id}`);
  return data;
};

export const rollbackDeployment = async (
  id: string,
): Promise<RollbackResponse> => {
  const { data } = await client.post<RollbackResponse>(
    `/deploy/${id}/rollback`,
  );
  return data;
};

export const getDeploymentLogs = async (id: string): Promise<LogsResponse> => {
  const { data } = await client.get<LogsResponse>(`/deploy/${id}/logs`);
  return data;
};
