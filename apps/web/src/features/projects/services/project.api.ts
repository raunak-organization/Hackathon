import client from '@/lib/client';
import {
  CreateProjectResponse,
  GetProjectDeploymentsResponse,
  GetProjectsResponse,
} from '../types';

const BASE = '/api/projects';

export const getProjects = async (): Promise<GetProjectsResponse> => {
  const { data } = await client.get<GetProjectsResponse>(BASE);
  return data;
};

export const createProject = async (payload: {
  name: string;
  repoUrl: string;
}): Promise<CreateProjectResponse> => {
  const { data } = await client.post<CreateProjectResponse>(BASE, payload);
  return data;
};

export const getProjectDeployments = async (
  projectId: string,
): Promise<GetProjectDeploymentsResponse> => {
  const { data } = await client.get<GetProjectDeploymentsResponse>(
    `${BASE}/${projectId}/deployments`,
  );
  return data;
};
