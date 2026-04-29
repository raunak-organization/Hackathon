import crypto from 'crypto';
import { LoginUserInput, RegisterUserInput } from '@repo/zod-config';
import { ConflictError, UnauthorizedError } from '../../utils/appError.js';
import { userService } from '../user/user.service.js';
import { tokenService } from '../token/token.service.js';

export const authService = {
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
      user,
    };
  },

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
    };
  },
};
