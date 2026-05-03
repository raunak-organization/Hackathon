import fs from 'node:fs';
import path from 'node:path';
import { NotFoundError } from '../../utils/appError.js';
import { deployModel } from '../deploy/deploy.model.js';

export const staticDeployService = {
  // --- Serve static assets -------------------
  async staticDeployment(deploymentId: string, requestedPath: string) {
    const deployment = await deployModel.findById(deploymentId);

    if (!deployment || deployment.status !== 'success') {
      throw new NotFoundError('Deployment not found');
    }

    const buildPath = deployment.buildPath || '';

    const rootDir = path.resolve(process.cwd(), '../../');

    const baseDir = path.join(
      rootDir,
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
