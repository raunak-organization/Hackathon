import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../utils/appError.js';
import { tokenService } from '../module/token/token.service.js';
import logger from '../config/logger.js';

const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new UnauthorizedError('Authorization header missing');
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new UnauthorizedError('Invalid authorization format');
  }

  try {
    const decoded = tokenService.verifyAccessToken(token);

    if (!decoded?.sub) {
      throw new UnauthorizedError('Invalid token payload');
    }

    req.userId = decoded.sub;
    next();
  } catch (error) {
    logger.error('Auth failed', { error });
    throw new UnauthorizedError('Invalid or expired token');
  }
};

export default authMiddleware;
