import { CookieOptions, Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authService } from './auth.service.js';
import {
  LoginUserInput,
  loginUserSchema,
  RegisterUserInput,
  registerUserSchema,
} from '@repo/zod-config';
import { UnauthorizedError } from '../../utils/appError.js';
import { userService } from '../user/user.service.js';
import { env } from 'node:process';

export interface CookieRequest extends Request {
  cookies: {
    refreshToken?: string;
  };
}

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 30 * 24 * 60 * 60 * 1000,
  path: '/',
};

// ------ Register user -----------------------
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const data: RegisterUserInput = await registerUserSchema.parseAsync(
      req.body,
    );

    const { accessToken, refreshToken, user } =
      await authService.registerUser(data);

    res.cookie('refreshToken', refreshToken, cookieOptions);

    res.status(201).json({
      sucess: true,
      data: {
        accessToken,
        user,
      },
    });
  },
);

// ------ Login user -----------------------
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const data: LoginUserInput = await loginUserSchema.parseAsync(req.body);

  const { accessToken, refreshToken, user } = await authService.loginUser(data);

  res.cookie('refreshToken', refreshToken, cookieOptions);

  res.status(200).json({
    success: true,
    data: {
      accessToken,
      user,
    },
  });
});

// ------ Get User -----------------------
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.userId) {
    throw new UnauthorizedError('Unauthorized');
  }

  const user = await userService.findById(req.userId);
  if (!user) throw new UnauthorizedError('Invalid Credentials.');

  res.status(200).json({
    success: true,
    data: user,
  });
});

// ------ Refresh token -----------------------
export const refresh = asyncHandler(
  async (req: CookieRequest, res: Response) => {
    const rawToken = req.cookies.refreshToken;

    if (!rawToken) throw new UnauthorizedError('Unauthorized');

    const { accessToken, refreshToken: newRefreshToken } =
      await authService.refreshToken(rawToken);

    // set new refresh token cookie
    res.cookie('refreshToken', newRefreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      data: {
        accessToken,
      },
    });
  },
);
