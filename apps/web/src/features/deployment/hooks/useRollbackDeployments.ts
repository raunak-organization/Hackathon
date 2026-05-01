import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rollbackDeployment } from '../services/deployment.api';

export const useRollbackDeployment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await rollbackDeployment(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['deployments'] });
    },
  });
};
