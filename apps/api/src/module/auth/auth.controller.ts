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
import { env } from '../../config/env.js';
import { tokenService } from '../token/token.service.js';
import { TokenType } from '../token/token.model.js';
import { generateState } from 'arctic';
import { github } from '../../github/github.js';
import { githubOAuthService } from '../../github/github.service.js';

export interface CookieRequest extends Request {
  cookies: {
    refreshToken?: string;
    github_oauth_state?: string;
  };
}

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
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
      success: true,
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

// ------ Logout user -----------------------
export const logout = asyncHandler(
  async (req: CookieRequest, res: Response) => {
    const rawToken = req.cookies.refreshToken;
    if (!rawToken) throw new UnauthorizedError('Unauthorized');

    const tokenDoc = await tokenService.findValidToken(
      rawToken,
      TokenType.REFRESH,
    );
    if (!tokenDoc)
      throw new UnauthorizedError('Invalid or expired refresh token');

    await tokenService.markUsed(tokenDoc);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    res.status(200).json({
      success: true,
      message: 'Logged Out Successfully.',
    });
  },
);

// ------ Github Login -----------------------
export const getGithubLoginPage = asyncHandler(
  (req: Request, res: Response) => {
    const state = generateState();
    const url = github.createAuthorizationURL(state, ['user:email']);

    res.cookie('github_oauth_state', state, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.redirect(url.toString());
  },
);

export const githubCallback = asyncHandler(
  async (req: Request, res: Response) => {
    const { code, state } = req.query;
    const { github_oauth_state: storedState } = req.cookies;

    if (!code || !state || state !== storedState) {
      return res.redirect(`${env.FRONTEND_URL}/login?error=invalid_oauth`);
    }

    const { accessToken, refreshToken } =
      await githubOAuthService.loginWithGithub(code as string);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.redirect(`${env.FRONTEND_URL}/?token=${accessToken}`);
  },
);
