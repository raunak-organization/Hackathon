import { Router } from 'express';
import { createProject, getProjects } from './project.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const projectRouter = Router();

projectRouter.use(authMiddleware);

projectRouter.post('/', createProject);
projectRouter.get('/', getProjects);

export default projectRouter;
