import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { projectService } from './project.service.js';
import { UnauthorizedError } from '../../utils/appError.js';
import { CreateProjectInput, createProjectSchema } from '@repo/zod-config';

export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.userId) throw new UnauthorizedError('Unauthorized');

    const { name }: CreateProjectInput = await createProjectSchema.parseAsync(
      req.body,
    );

    const project = await projectService.createProject(req.userId, name);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project,
    });
  },
);

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) throw new UnauthorizedError('Unauthorized');

  const projects = await projectService.getUserProjects(userId);

  res.status(200).json({
    success: true,
    message: 'Projects fetched successfully',
    projects,
  });
});
