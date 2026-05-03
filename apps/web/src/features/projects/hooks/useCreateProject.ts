import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '../services/project.api';

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
    },
  });
};
