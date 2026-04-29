import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../utils/appError.js';
import { tokenService } from '../module/token/token.service.js';

export interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) throw new UnauthorizedError('No token provided.');

  try {
    const decoded = tokenService.verifyAccessToken(token);

    if (!decoded.sub) throw new UnauthorizedError('Invalid token.');

    req.userId = decoded.sub;
    next();
  } catch {
    throw new UnauthorizedError('Unauthorized');
  }
};

export default authMiddleware;
