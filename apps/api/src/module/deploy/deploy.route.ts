import { Router } from 'express';
import {
  createDeployment,
  getAllDeployment,
  getDeploymentById,
  getDeploymentLogs,
  rollbackDeployment,
  StaticDeployment,
} from './deploy.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const deployRouter = Router();

deployRouter.post('/', authMiddleware, createDeployment);

deployRouter.get('/', authMiddleware, getAllDeployment);

deployRouter.get('/:id/logs', authMiddleware, getDeploymentLogs);

deployRouter.get('/:id', authMiddleware, getDeploymentById);

deployRouter.post('/:id/rollback', authMiddleware, rollbackDeployment);

// public route
deployRouter.get('/:id{/*path}', StaticDeployment);

export default deployRouter;
