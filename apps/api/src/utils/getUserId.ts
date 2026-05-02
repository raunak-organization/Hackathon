import { Request } from 'express';
import { UnauthorizedError } from './appError.js';

export const getUserId = (req: Request) => {
  if (!req.userId) {
    throw new UnauthorizedError('Unauthorized');
  }

  return req.userId;
};
