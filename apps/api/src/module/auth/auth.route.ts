import { Router } from 'express';
import {
  getMe,
  loginUser,
  logout,
  refresh,
  registerUser,
} from './auth.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/register', registerUser);

authRouter.post('/login', loginUser);

authRouter.get('/get-me', authMiddleware, getMe);

authRouter.post('/refresh', refresh);

authRouter.post('/logout', logout);

export default authRouter;
