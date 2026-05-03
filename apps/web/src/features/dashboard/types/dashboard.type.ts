export interface DashboardStatsResponse {
  success: boolean;
  stats: {
    totalProjects: number;
    totalDeployments: number;
    successfulDeployments: number;
    failedDeployments: number;
  };
}
