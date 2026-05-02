import { Router } from 'express';
import {
  createDeployment,
  rollbackDeployment,
  StaticDeployment,
} from './deploy.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const deployRouter = Router();

deployRouter.post('/', authMiddleware, createDeployment);
deployRouter.post('/:id/rollback', authMiddleware, rollbackDeployment);
deployRouter.get('/:id{/*path}', StaticDeployment);

export default deployRouter;
