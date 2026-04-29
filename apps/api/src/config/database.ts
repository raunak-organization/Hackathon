import mongoose from 'mongoose';
import logger from './logger.js';
import { env } from './env.js';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info('MongoDB connected');
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error('DB connection failed', {
        message: err.message,
        stack: err.stack,
      });
    } else {
      logger.error('DB connection failed', { error: String(err) });
    }
    process.exit(1);
  }
};
