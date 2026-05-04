import logger from '../../config/logger.js';
import { runBuild } from '../../services/build.service.js';
import { ConflictError, NotFoundError } from '../../utils/appError.js';
import { projectModel } from '../project/project.model.js';
import { deployModel } from './deploy.model.js';
import { DeploymentLean, PopulatedProject } from './types/deploy.type.js';

export const deployService = {
  // --- Create a new deployment -------------------
  async createDeployment(
    userId: string,
    projectId: string,
    env: Record<string, string>,
  ) {
    const project = await projectModel.findOneAndUpdate(
      { _id: projectId, userId },
      { $inc: { deploymentCount: 1 } },
      { new: true },
    );

    if (!project) throw new NotFoundError('Project not found or unauthorized');
    const activeDeployment = await deployModel.findOne({
      projectId,
      status: {
        $in: ['pending', 'building'],
      },
    });

    if (activeDeployment)
      throw new ConflictError('Another deployment is already in progress');

    const version = project.deploymentCount;
    const deployment = await deployModel.create({
      userId,
      projectId,
      env,
      version,
      status: 'pending',
    });

    runBuild(deployment._id.toString()).catch((err: unknown) => {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown build error';

      logger.error('Build Failed', {
        deploymentId: deployment._id.toString(),
        error: errorMessage,
      });
    });

    return deployment;
  },

  // --- Get all deployments -------------------
  async getAllDeployment(userId: string, limit = 50) {
    const deployments = await deployModel
      .find({ userId })
      .populate<{ projectId: PopulatedProject }>('projectId', 'name repoUrl')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean<DeploymentLean[]>();

    return deployments.map((d) => ({
      ...d,
      projectName: d.projectId.name,
      repoUrl: d.projectId.repoUrl,
    }));
  },

  // --- Get all logs -------------------
  async getAllLogs(userId: string) {
    const deployments = await deployModel
      .find({ userId })
      .select('logs projectId createdAt')
      .populate('projectId', 'name');

    return deployments.map((d) => ({
      deploymentId: d._id,
      project: d.projectId,
      logs: d.logs,
      createdAt: d.createdAt,
    }));
  },

  // --- Get all env variables -------------------
  async getAllEnv(userId: string) {
    const deployments = await deployModel
      .find({ userId })
      .select('env projectId createdAt')
      .populate('projectId', 'name');

    return deployments.map((d) => ({
      deploymentId: d._id,
      project: d.projectId,
      env: d.env,
      createdAt: d.createdAt,
    }));
  },

  // --- Get logs of specific deployment -------------------
  async getDeploymentLogs(deploymentId: string, userId: string) {
    const deployment = await deployModel.findOne({
      _id: deploymentId,
      userId,
    });

    if (!deployment) {
      throw new NotFoundError('Deployment not found');
    }

    return deployment.logs;
  },

  // --- Get env variables of specific deployment -------------------
  async getDeploymentEnv(deploymentId: string, userId: string) {
    const deployment = await deployModel.findOne({
      _id: deploymentId,
      userId,
    });

    if (!deployment) {
      throw new NotFoundError('Deployment not found');
    }

    return deployment.env;
  },

  // --- Get specific deployment -------------------
  async getDeploymentById(deploymentId: string, userId: string) {
    const deployment = await deployModel
      .findOne({
        _id: deploymentId,
        userId,
      })
      .populate('projectId', 'name repoUrl currentDeploymentId');

    if (!deployment) {
      throw new NotFoundError('Deployment not found');
    }

    return deployment;
  },

  // --- Rollback to previous deployment -------------------
  async rollback(deploymentId: string, userId: string) {
    const deployment = await deployModel.findOne({
      _id: deploymentId,
      userId,
    });

    if (!deployment) throw new NotFoundError('Deployment not found');

    // find previous successful deployment
    const previous = await deployModel
      .findOne({
        projectId: deployment.projectId,
        status: 'success',
        version: { $lt: deployment.version },
      })
      .sort({ version: -1 });

    if (!previous) {
      throw new NotFoundError('No previous successful deployment');
    }

    await projectModel.findByIdAndUpdate(deployment.projectId, {
      currentDeploymentId: previous._id,
    });

    return previous;
  },
};
