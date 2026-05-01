import { useQuery } from '@tanstack/react-query';
import { getAllDeployments } from '../services/deployment.api';

export const useDeployments = () => {
  return useQuery({
    queryKey: ['deployments'],
    queryFn: async () => await getAllDeployments(),
  });
};
