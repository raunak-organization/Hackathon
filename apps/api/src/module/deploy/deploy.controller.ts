import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { deployService } from './deploy.service.js';
import { CreateDeployInput, createDeploySchema } from '@repo/zod-config';
import { getUserId } from '../../utils/getUserId.js';

// --- Create a new deployment -------------------
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

// --- Get all deployments -------------------
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

// --- Get all logs -------------------
export const getAllLogs = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req);

  const logs = await deployService.getAllLogs(userId);

  res.status(200).json({
    success: true,
    logs,
  });
});

// --- Get all env variables -------------------
export const getAllEnv = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req);

  const envs = await deployService.getAllEnv(userId);

  res.status(200).json({
    success: true,
    envs,
  });
});

// --- Get logs of specific deployment -------------------
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

// --- Get env variables of specific deployment -------------------
export const getDeploymentEnv = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = getUserId(req);

    const env = await deployService.getDeploymentEnv(
      req.params.id as string,
      userId,
    );

    res.status(200).json({
      success: true,
      env,
    });
  },
);

// --- Get specific deployment -------------------
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

// --- Rollback to previous deployment -------------------
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
