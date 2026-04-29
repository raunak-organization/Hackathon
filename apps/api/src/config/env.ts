import 'dotenv/config';
import { NotFoundError } from '../utils/appError.js';

const getEnv = (key: keyof NodeJS.ProcessEnv) => {
  const value = process.env[key];

  if (!value) {
    throw new NotFoundError(`Missing env var: ${key}`);
  }
  return value;
};

export const env = {
  PORT: Number(getEnv('PORT')),
  LOG_LEVEL: process.env.LOG_LEVEL,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: getEnv('JWT_SECRET'),
  MONGO_URI: getEnv('MONGO_URI'),
};
