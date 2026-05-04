import { Router } from 'express';
import {
  createDeployment,
  getAllDeployment,
  getAllEnv,
  getAllLogs,
  getDeploymentById,
  getDeploymentEnv,
  getDeploymentLogs,
  rollbackDeployment,
} from './deploy.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const deployRouter = Router();

deployRouter.use(authMiddleware);

// Create a new deployment
deployRouter.post('/', createDeployment);

// Get all deployments
deployRouter.get('/', getAllDeployment);

// Get all logs
deployRouter.get('/logs', getAllLogs);

// Get all env variables
deployRouter.get('/env', getAllEnv);

// Get logs of specific deployment
deployRouter.get('/:id/logs', getDeploymentLogs);

// Get env variables of specific deployment
deployRouter.get('/:id/env', getDeploymentEnv);

// Get specific deployment
deployRouter.get('/:id', getDeploymentById);

// Rollback to previous deployment
deployRouter.post('/:id/rollback', rollbackDeployment);

export default deployRouter;
