import { useQuery } from '@tanstack/react-query';
import { getProjectDeployments } from '../services/project.api';

export const useProjectDeployment = (projectId: string) => {
  return useQuery({
    queryKey: ['project-deployments', projectId],
    queryFn: async () => {
      return getProjectDeployments(projectId);
    },
  });
};
