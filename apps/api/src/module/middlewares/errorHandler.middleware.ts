import { Request, Response, NextFunction } from 'express';
import logger from '../../config/logger.js';
import { AppError } from '../../utils/appError.js';
import { ZodError } from '@repo/zod-config';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors: err.issues.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  if (err instanceof AppError) {
    logger.error('AppError occurred', {
      message: err.message,
      stack: err.stack,
      path: req.originalUrl,
      method: req.method,
    });

    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof Error) {
    logger.error('Unknown error occurred', {
      message: err.message,
      stack: err.stack,
      path: req.originalUrl,
      method: req.method,
    });

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }

  logger.error('Non-error thrown', {
    error: err,
    path: req.originalUrl,
    method: req.method,
  });

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};
