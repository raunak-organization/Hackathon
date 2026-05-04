import { useQuery } from '@tanstack/react-query';
import { getDeploymentEnv } from '../services/deployment.api';

export const useDeploymentEnv = (id: string | null) => {
  return useQuery({
    queryKey: ['deployments', id, 'env'],
    queryFn: async () => await getDeploymentEnv(id!),
    enabled: !!id,
  });
};
