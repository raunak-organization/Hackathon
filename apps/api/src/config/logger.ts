import pino from 'pino';
import path from 'node:path';
import { createNodeLogger } from '@repo/logger';
import { env } from './env.js';

const LOGS_DIR = path.join(process.cwd(), 'logs');

const isDev = env.NODE_ENV !== 'production';

const transport = isDev
  ? pino.transport({
      targets: [
        {
          // Human-readable colorized output in terminal
          target: 'pino-pretty',
          level: env.LOG_LEVEL ?? 'debug',
          options: {
            colorize: true,
            translateTime: 'SYS:HH:MM:ss',
            ignore: 'pid,hostname',
          },
        },
        {
          // JSON file for local debugging
          target: 'pino/file',
          level: env.LOG_LEVEL ?? 'debug',
          options: { destination: path.join(LOGS_DIR, 'app.log'), mkdir: true },
        },
      ],
    })
  : pino.transport({
      targets: [
        {
          // All levels — JSON, no pretty printing
          target: 'pino/file',
          level: env.LOG_LEVEL ?? 'info',
          options: { destination: path.join(LOGS_DIR, 'app.log'), mkdir: true },
        },
        {
          // Errors only — separate file for quick triage
          target: 'pino/file',
          level: 'error',
          options: {
            destination: path.join(LOGS_DIR, 'error.log'),
            mkdir: true,
          },
        },
      ],
    });

const pinoInstance = pino(
  {
    level: env.LOG_LEVEL ?? (isDev ? 'debug' : 'info'),
    base: { service: 'backend', env: env.NODE_ENV },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  transport,
);

const logger = createNodeLogger(pinoInstance);

export default logger;
