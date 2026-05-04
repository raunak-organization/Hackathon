import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './module/auth/auth.route.js';
import userRouter from './module/user/user.route.js';
import deployRouter from './module/deploy/deploy.route.js';
import projectRouter from './module/project/project.route.js';
import { errorHandler } from './module/middlewares/errorHandler.middleware.js';
import dashboardRouter from './module/dashboard/dashboard.route.js';
import staticRouter from './module/static/staticDeploy.route.js';
import { env } from './config/env.js';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/deploy', deployRouter);
app.use('/api/projects', projectRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/static', staticRouter);

app.use(errorHandler);

export default app;
