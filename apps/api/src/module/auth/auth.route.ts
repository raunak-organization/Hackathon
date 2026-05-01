import { Router, RequestHandler } from 'express';
import {
  getMe,
  loginUser,
  logout,
  refresh,
  registerUser,
  githubCallback,
} from './auth.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import passport from 'passport';
import { env } from '../../config/env.js';

const authRouter = Router();

authRouter.post('/register', registerUser);

authRouter.post('/login', loginUser);

authRouter.get('/get-me', authMiddleware, getMe);

authRouter.post('/refresh', refresh);

authRouter.post('/logout', logout);

authRouter.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
    session: false,
  }) as RequestHandler,
);
authRouter.get(
  '/github/callback',
  passport.authenticate('github', {
    session: false,
    failureRedirect: `${env.FRONTEND_URL}/login?error=github_failed`,
  }) as RequestHandler,
  githubCallback,
);

export default authRouter;
