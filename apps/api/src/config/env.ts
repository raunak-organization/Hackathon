import 'dotenv/config';
import { NotFoundError } from '../utils/appError';

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
};
