export type DeploymentStatus = 'pending' | 'building' | 'success' | 'failed';

export interface Deployment {
  id: string;
  userId: string;
  projectId: string;
  repoUrl: string;
  env: Record<string, string>;
  status: DeploymentStatus;
  logs: string;
  deployUrl: string;
  version: number;
  createdAt: string;
}

export interface CreateDeploymentPayload {
  projectId: string;
  repoUrl: string;
  env?: Record<string, string>;
}

export interface RollbackResponse {
  message: string;
  newDeploymentId: string;
}

export interface LogsResponse {
  logs: string;
}
