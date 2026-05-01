import express, { Express } from 'express';
import authRouter from './module/auth/auth.route.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import cookieParser from 'cookie-parser';
import passport from './config/passport.js';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api/auth', authRouter);

app.use(errorHandler);

export default app;
