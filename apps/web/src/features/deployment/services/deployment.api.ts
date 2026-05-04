import client from '@/lib/client';
import {
  AllEnvResponse,
  AllLogsResponse,
  CreateDeploymentPayload,
  Deployment,
  EnvResponse,
  GetDeploymentsResponse,
  LogsResponse,
  RollbackResponse,
} from '../type';

const BASE = '/api/deploy';

export const getAllDeployments = async (limit = 5): Promise<Deployment[]> => {
  const { data } = await client.get<GetDeploymentsResponse>(
    `${BASE}?limit=${limit}`,
  );
  return data.deployments;
};

export const createDeployment = async (
  payload: CreateDeploymentPayload,
): Promise<Deployment> => {
  const { data } = await client.post<{ deployment: Deployment }>(BASE, payload);
  return data.deployment;
};

export const getDeploymentById = async (id: string): Promise<Deployment> => {
  const { data } = await client.get<{ deployment: Deployment }>(
    `${BASE}/${id}`,
  );
  return data.deployment;
};

export const rollbackDeployment = async (
  id: string,
): Promise<RollbackResponse> => {
  const { data } = await client.post<RollbackResponse>(
    `${BASE}/${id}/rollback`,
  );
  return data;
};

export const getDeploymentLogs = async (id: string): Promise<LogsResponse> => {
  const { data } = await client.get<LogsResponse>(`${BASE}/${id}/logs`);
  return data;
};

export const getDeploymentEnv = async (id: string): Promise<EnvResponse> => {
  const { data } = await client.get<EnvResponse>(`${BASE}/${id}/env`);
  return data;
};

export const getAllLogs = async (): Promise<AllLogsResponse['logs']> => {
  const { data } = await client.get<AllLogsResponse>(`${BASE}/logs`);
  return data.logs;
};

export const getAllEnv = async (): Promise<AllEnvResponse['envs']> => {
  const { data } = await client.get<AllEnvResponse>(`${BASE}/env`);
  return data.envs;
};
