import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { projectService } from './project.service.js';
import { CreateProjectInput, createProjectSchema } from '@repo/zod-config';
import { getUserId } from '../../utils/getUserId.js';

export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = getUserId(req);

    const { name, repoUrl }: CreateProjectInput =
      await createProjectSchema.parseAsync(req.body);

    const project = await projectService.createProject(userId, name, repoUrl);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project,
    });
  },
);

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req);

  const projects = await projectService.getUserProjects(userId);

  res.status(200).json({
    success: true,
    message: 'Projects fetched successfully',
    projects,
  });
});

export const getProjectDeployments = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = getUserId(req);

    const projectId = req.params.projectId as string;

    const deployments = await projectService.getProjectDeployments(
      projectId,
      userId,
    );

    res.status(200).json({
      success: true,
      deployments,
    });
  },
);
