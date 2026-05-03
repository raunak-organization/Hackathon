import path from 'node:path';
import fs from 'node:fs';
import logger from '../../config/logger.js';
import { runBuild } from '../../services/build.service.js';
import { ConflictError, NotFoundError } from '../../utils/appError.js';
import { projectModel } from '../project/project.model.js';
import { deployModel } from './deploy.model.js';

export const deployService = {
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

  async getAllDeployment(userId: string) {
    const deployments = await deployModel
      .find({ userId })
      .populate('projectId', 'name repoUrl')
      .sort({ createdAt: -1 });

    return deployments;
  },

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

  async staticDeployment(deploymentId: string, requestedPath: string) {
    const deployment = await deployModel.findById(deploymentId);

    if (!deployment || deployment.status !== 'success') {
      throw new NotFoundError('Deployment not found');
    }

    const buildPath = deployment.buildPath || '';

    const baseDir = path.join(
      process.cwd(),
      'storage',
      'deployments',
      deploymentId,
      buildPath,
    );

    const safePath = path
      .normalize(requestedPath)
      .replace(/^(\.\.(\/|\\|$))+/, '');
    const filePath = path.join(baseDir, safePath);
    if (!filePath.startsWith(baseDir)) {
      throw new NotFoundError('Invalid file path');
    }

    if (fs.existsSync(filePath)) {
      return {
        filePath,
        isHtml: filePath.endsWith('.html'),
      };
    }

    const indexPath = path.join(baseDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      return {
        filePath: indexPath,
        isHtml: true,
      };
    }

    throw new NotFoundError('Deployment not found');
  },
};
