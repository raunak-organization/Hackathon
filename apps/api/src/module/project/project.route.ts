import { Router } from 'express';
import {
  createProject,
  getProjectDeployments,
  getProjects,
} from './project.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const projectRouter = Router();

projectRouter.use(authMiddleware);

projectRouter.post('/', createProject);
projectRouter.get('/', getProjects);
projectRouter.get('/:projectId/deployments', getProjectDeployments);

export default projectRouter;
