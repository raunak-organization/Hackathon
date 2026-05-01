import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDeployment } from '../services/deployment.api';
import { CreateDeploymentPayload } from '../type';

export const useCreateDeployment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateDeploymentPayload) =>
      await createDeployment(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['deployments'] });
    },
  });
};
