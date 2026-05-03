import client from '@/lib/client';
import { CreateProjectInput } from '@repo/zod-config';
import {
  CreateProjectResponse,
  GetProjectDeploymentsResponse,
  GetProjectsResponse,
} from '../types';

export const createProject = async (data: CreateProjectInput) => {
  const response = await client.post<CreateProjectResponse>(
    '/api/projects',
    data,
  );
  return response.data;
};

export const getProjects = async () => {
  const response = await client.get<GetProjectsResponse>('/api/projects');
  return response.data;
};

export const getProjectDeployments = async (projectId: string) => {
  const response = await client.get<GetProjectDeploymentsResponse>(
    `/api/projects/${projectId}/deployments`,
  );
  return response.data;
};
