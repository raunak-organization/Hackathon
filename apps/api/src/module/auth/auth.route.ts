import { Router } from 'express';
import {
  getMe,
  loginUser,
  logout,
  refresh,
  registerUser,
  githubCallback,
  getGithubLoginPage,
} from './auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/register', registerUser);

authRouter.post('/login', loginUser);

authRouter.get('/get-me', authMiddleware, getMe);

authRouter.post('/refresh', refresh);

authRouter.post('/logout', logout);

authRouter.get('/github', getGithubLoginPage);
authRouter.get('/github/callback', githubCallback);

export default authRouter;
