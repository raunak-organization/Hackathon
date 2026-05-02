import { deployModel } from '../deploy/deploy.model.js';
import { projectModel } from './project.model.js';

export const projectService = {
  async createProject(userId: string, name: string, repoUrl: string) {
    return projectModel.create({
      userId,
      name,
      repoUrl,
    });
  },

  async getUserProjects(userId: string) {
    return projectModel.find({ userId }).sort({ createdAt: -1 });
  },

  async getProjectDeployments(projectId: string, userId: string) {
    return deployModel.find({ projectId, userId }).sort({ createdAt: -1 });
  },
};
