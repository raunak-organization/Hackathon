import { Request, Response } from 'express';
import fs from 'node:fs';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { deployService } from './deploy.service.js';
import { UnauthorizedError } from '../../utils/appError.js';
import { CreateDeployInput, createDeploySchema } from '@repo/zod-config';

export const createDeployment = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      throw new UnauthorizedError('Unauthorized');
    }

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

export const rollbackDeployment = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;
    if (!userId) throw new UnauthorizedError('Unauthorized');

    const deployment = await deployService.rollback(
      req.params.id as string,
      userId,
    );

    res.json({
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

    html = html
      .replace(/src="\/assets\//g, `src="/api/deploy/${id as string}/assets/`)
      .replace(
        /href="\/assets\//g,
        `href="/api/deploy/${id as string}/assets/`,
      );

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  },
);
