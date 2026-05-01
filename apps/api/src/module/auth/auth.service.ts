import crypto from 'crypto';
import { LoginUserInput, RegisterUserInput } from '@repo/zod-config';
import { ConflictError, UnauthorizedError } from '../../utils/appError.js';
import { userService } from '../user/user.service.js';
import { tokenService } from '../token/token.service.js';
import tokenModel, { TokenType } from '../token/token.model.js';
import { UserDocument } from '../user/user.model.js';

export const authService = {
  // ------ Register user -----------------------
  registerUser: async (data: RegisterUserInput) => {
    const { name, email, password } = data;

    const existingUser = await userService.findUserByEmail(email);

    if (existingUser) {
      throw new ConflictError('User already exists');
    }

    const user = await userService.createUser({
      name,
      email,
      passwordHash: password,
    });

    const refreshToken = crypto.randomBytes(40).toString('hex');
    const accessToken = tokenService.generateAccessToken(user._id);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  },

  // ------ Login user -----------------------
  loginUser: async (data: LoginUserInput) => {
    const { email, password } = data;

    const user = await userService.findUserByEmail(email);

    if (!user) throw new UnauthorizedError('Invalid credentials');

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) throw new UnauthorizedError('Invalid credentials');

    const refreshToken = crypto.randomBytes(40).toString('hex');
    const accessToken = tokenService.generateAccessToken(user._id);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  },
  // ------ GitHub OAuth Tokens -----------------------
  generateTokensForOAuth: async (user: UserDocument) => {
    const { rawValue: refreshToken } = await tokenModel.generateToken(
      user._id,
      TokenType.REFRESH,
    );

    const accessToken = tokenService.generateAccessToken(user._id);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  },

  // ------ Refresh token -----------------------
  refreshToken: async (rawToken: string) => {
    const tokenDoc = await tokenService.findValidToken(
      rawToken,
      TokenType.REFRESH,
    );

    if (!tokenDoc)
      throw new UnauthorizedError('Invalid or expired refresh token');

    const user = await userService.findById(tokenDoc.userId.toString());
    if (!user) throw new UnauthorizedError('Invalid credentials');

    await tokenService.markUsed(tokenDoc);

    const { rawValue: newRefreshToken } = await tokenModel.generateToken(
      user._id,
      TokenType.REFRESH,
    );
    const accessToken = tokenService.generateAccessToken(user._id);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  },
};
