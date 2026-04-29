import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authService } from './auth.service.js';
import {
  LoginUserInput,
  loginUserSchema,
  RegisterUserInput,
  registerUserSchema,
} from '@repo/zod-config';
import { env } from '../../config/env.js';

// ------ Register user -----------------------
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const data: RegisterUserInput = await registerUserSchema.parseAsync(
      req.body,
    );

    const { accessToken, refreshToken, user } =
      await authService.registerUser(data);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/',
    });

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

  const { accessToken, refreshToken } = await authService.loginUser(data);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: '/',
  });

  res.status(200).json({
    success: true,
    data: {
      accessToken,
    },
  });
});
