export type DeploymentStatus = 'pending' | 'building' | 'success' | 'failed';

export interface Deployment {
  _id: string;
  userId: string;
  projectId: string;
  projectName: string;
  repoUrl: string;
  env: Record<string, string>;
  status: DeploymentStatus;
  logs: string[];
  deployUrl: string | null;
  version: number;
  createdAt: string;
}

export interface CreateDeploymentPayload {
  projectId: string;
  env?: Record<string, string>;
}

export interface GetDeploymentsResponse {
  success: boolean;
  deployments: Deployment[];
}

export interface LogsResponse {
  success: boolean;
  logs: string[];
}

export interface EnvResponse {
  success: boolean;
  env: Record<string, string>;
}

export interface RollbackResponse {
  success: boolean;
  message: string;
  deployment: Deployment;
}

export interface AllLogsResponse {
  success: boolean;
  logs: Array<{
    deploymentId: string;
    project: { _id: string; name: string };
    logs: string[];
    createdAt: string;
  }>;
}

export interface AllEnvResponse {
  success: boolean;
  envs: Array<{
    deploymentId: string;
    project: { _id: string; name: string };
    env: Record<string, string>;
    createdAt: string;
  }>;
}
