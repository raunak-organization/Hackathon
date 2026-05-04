import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rollbackDeployment } from '../services/deployment.api';
import { isAxiosError } from 'axios';

export const useRollbackDeployment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await rollbackDeployment(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['deployments'] });
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        const message = (error.response?.data as { message?: string })?.message;

        if (status === 404 && message?.toLowerCase().includes('previous')) {
          // surfaced to the component via mutation.error
          return;
        }
      }
    },
  });
};
