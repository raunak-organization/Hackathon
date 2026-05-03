import { Request, Response } from 'express';
import fs from 'node:fs';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { deployService } from './deploy.service.js';
import { CreateDeployInput, createDeploySchema } from '@repo/zod-config';
import { getUserId } from '../../utils/getUserId.js';

export const createDeployment = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = getUserId(req);

    const { projectId, env }: CreateDeployInput =
      await createDeploySchema.parseAsync(req.body);

    const deployment = await deployService.createDeployment(
      userId,
      projectId,
      env,
    );

    res.status(201).json({
      success: true,
      deployment,
    });
  },
);

export const getAllDeployment = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = getUserId(req);

    const deployments = await deployService.getAllDeployment(userId);

    res.json({
      success: true,
      deployments,
    });
  },
);

export const getDeploymentById = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = getUserId(req);

    const deployment = await deployService.getDeploymentById(
      req.params.id as string,
      userId,
    );

    res.status(200).json({
      success: true,
      deployment,
    });
  },
);

export const getDeploymentLogs = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = getUserId(req);

    const logs = await deployService.getDeploymentLogs(
      req.params.id as string,
      userId,
    );

    res.status(200).json({
      success: true,
      logs,
    });
  },
);

export const rollbackDeployment = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = getUserId(req);

    const deployment = await deployService.rollback(
      req.params.id as string,
      userId,
    );

    res.json({
      success: true,
      message: 'Rollback triggered',
      deployment,
    });
  },
);

export const StaticDeployment = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const rawPath = req.params.path;

    const requestedPath = Array.isArray(rawPath)
      ? rawPath.join('/')
      : rawPath || 'index.html';

    const result = await deployService.staticDeployment(
      id as string,
      requestedPath,
    );

    // serve normal static assets directly
    if (!result.isHtml) {
      return res.sendFile(result.filePath);
    }

    // rewrite asset paths inside index.html
    let html = fs.readFileSync(result.filePath, 'utf-8');

    html = html.replace(
      '<head>',
      `<head>\n  <base href="/api/deploy/${id as string}/">`,
    );

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  },
);
