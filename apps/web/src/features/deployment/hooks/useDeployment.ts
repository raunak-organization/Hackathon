import { useQuery } from '@tanstack/react-query';
import { getDeploymentById } from '../services/deployment.api';

export const useDeployment = (id: string | null) => {
  return useQuery({
    queryKey: ['deployments', id],
    queryFn: async () => await getDeploymentById(id!),
    enabled: !!id,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === 'pending' || status === 'building' ? 3000 : false;
    },
  });
};
