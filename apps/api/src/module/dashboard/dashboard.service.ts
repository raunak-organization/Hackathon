import { projectModel } from '../project/project.model.js';
import { deployModel } from '../deploy/deploy.model.js';

export const dashboardService = {
  async getStats(userId: string) {
    const totalProjects = await projectModel.countDocuments({
      userId,
    });

    const totalDeployments = await deployModel.countDocuments({
      userId,
    });

    const successfulDeployments = await deployModel.countDocuments({
      userId,
      status: 'success',
    });

    const failedDeployments = await deployModel.countDocuments({
      userId,
      status: 'failed',
    });

    return {
      totalProjects,
      totalDeployments,
      successfulDeployments,
      failedDeployments,
    };
  },
};
