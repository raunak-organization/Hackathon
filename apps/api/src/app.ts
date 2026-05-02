import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './module/auth/auth.route.js';
import deployRouter from './module/deploy/deploy.route.js';
import projectRouter from './module/project/project.routes.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use('/api/auth', authRouter);
app.use('/api/deploy', deployRouter);
app.use('/api/projects', projectRouter);

app.use(errorHandler);

export default app;
