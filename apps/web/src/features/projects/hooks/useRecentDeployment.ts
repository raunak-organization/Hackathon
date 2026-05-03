import { useQuery } from '@tanstack/react-query';
import { getProjects, getProjectDeployments } from '../services/project.api';

export const useRecentDeployments = () => {
  return useQuery({
    queryKey: ['recent-deployments'],
    queryFn: async () => {
      const projectsRes = await getProjects();
      const projects = projectsRes.projects;

      const deploymentResponses = await Promise.all(
        projects.map(async (project) => {
          const deploymentRes = await getProjectDeployments(project._id);

          return deploymentRes.deployments.map((deployment) => ({
            ...deployment,
            projectName: project.name,
          }));
        }),
      );

      return deploymentResponses
        .flat()
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 5);
    },
  });
};
