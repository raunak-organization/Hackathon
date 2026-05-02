import { projectModel } from './project.model.js';

export const projectService = {
  async createProject(userId: string, name: string) {
    return projectModel.create({
      userId,
      name,
    });
  },

  async getUserProjects(userId: string) {
    return projectModel.find({ userId }).sort({ createdAt: -1 });
  },
};
