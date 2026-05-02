import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { userService } from './user.service.js';
import { env } from '../../config/env.js';

// ------ Update Name -----------------------
export const updateName = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.userId;
  const { name } = req.body as { name: string };

  const updatedUser = await userService.updateName(userId, name);

  res.status(200).json({
    success: true,
    data: updatedUser,
  });
});

// ------ Update Password -----------------------
export const updatePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;
    const { oldPassword, newPassword } = req.body as {
      oldPassword: string;
      newPassword: string;
    };

    await userService.updatePassword(userId, oldPassword, newPassword);

    res.status(200).json({
      success: true,
      message: 'Password updated successfully.',
    });
  },
);

// ------ Delete User Account -----------------------
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.userId;

  await userService.deleteUser(userId);

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
  });

  res.status(200).json({
    success: true,
    message: 'Account deleted successfully.',
  });
});
// ------ Forgot / Reset Password ------

export const requestPasswordReset = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body as { email: string };

    await userService.requestPasswordReset(email);

    res.status(200).json({
      success: true,
      message:
        'If an account with that email exists, a reset link has been sent.',
    });
  },
);

export const confirmPasswordReset = asyncHandler(
  async (req: Request, res: Response) => {
    const { token, newPassword } = req.body as {
      token: string;
      newPassword: string;
    };

    await userService.resetPasswordWithToken(token, newPassword);

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully. You can now log in.',
    });
  },
);

// ------ Update Email Flow ------

export const requestEmailUpdate = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;
    const { newEmail } = req.body as { newEmail: string };

    await userService.requestEmailUpdate(userId, newEmail);

    res.status(200).json({
      success: true,
      message: 'A verification link has been sent to your new email address.',
    });
  },
);

export const verifyEmailUpdate = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;
    const { token } = req.body as { token: string };

    await userService.verifyEmailUpdate(userId, token);

    res.status(200).json({
      success: true,
      message: 'Email updated successfully.',
    });
  },
);
