import { Router } from 'express';
import { StaticDeployment } from './staticDeploy.controller.js';

const staticRouter = Router();

staticRouter.get('/:id{/*path}', StaticDeployment);

export default staticRouter;
