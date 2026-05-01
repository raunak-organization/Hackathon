import { useQuery } from '@tanstack/react-query';
import { getDeploymentLogs } from '../services/deployment.api';

export const useDeploymentLogs = (id: string | null, isBuilding: boolean) => {
  return useQuery({
    queryKey: ['deployments', id, 'logs'],
    queryFn: async () => await getDeploymentLogs(id!),
    enabled: !!id,
    refetchInterval: isBuilding ? 2000 : false,
  });
};
