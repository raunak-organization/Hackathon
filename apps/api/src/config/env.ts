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
  // GITHUB_CLIENT_ID: getEnv('GITHUB_CLIENT_ID'),
  // GITHUB_CLIENT_SECRET: getEnv('GITHUB_CLIENT_SECRET'),
  FRONTEND_URL: getEnv('FRONTEND_URL'),
  // GOOGLE_CLIENT_ID: getEnv('GOOGLE_CLIENT_ID'),
  // GOOGLE_CLIENT_SECRET: getEnv('GOOGLE_CLIENT_SECRET'),
  // GOOGLE_REFRESH_TOKEN: getEnv('GOOGLE_REFRESH_TOKEN'),
  // GOOGLE_USER: getEnv('GOOGLE_USER'),
};
