export interface Project {
  _id: string;
  name: string;
  repoUrl: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deployment {
  _id: string;
  userId: string;
  projectId: string;

  env: Record<string, string>;

  status: 'pending' | 'building' | 'success' | 'failed';

  logs: string[];

  deployUrl?: string;
  buildPath?: string;

  version: number;

  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectResponse {
  success: boolean;
  message: string;
  project: Project;
}

export interface GetProjectsResponse {
  success: boolean;
  message: string;
  projects: Project[];
}

export interface GetProjectDeploymentsResponse {
  success: boolean;
  deployments: Deployment[];
}
