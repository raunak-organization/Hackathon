import { Types } from 'mongoose';
import userModel, { IUser } from './user.model.js';
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../../utils/appError.js';
import tokenModel, { TokenType } from '../token/token.model.js';
import { tokenService } from '../token/token.service.js';
import { sendEmail } from '../../utils/email.js';
import { env } from '../../config/env.js';

export const userService = {
  async findUserByEmail(email: string) {
    return await userModel.findOne({ email }).select('+passwordHash');
  },

  async createUser(data: Partial<IUser>) {
    return await userModel.create(data);
  },

  async findById(userId: string) {
    return userModel.findById(new Types.ObjectId(userId));
  },

  async updateName(userId: string, name: string) {
    const user = await userModel.findByIdAndUpdate(
      userId,
      { name },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  },
  async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await userModel.findById(userId).select('+passwordHash');
    if (!user) throw new NotFoundError('User not found');

    if (!user.passwordHash) {
      throw new ConflictError(
        'This account is linked to GitHub. Please login via GitHub.',
      );
    }
    const isPasswordValid = await user.comparePassword(oldPassword);
    if (!isPasswordValid) throw new UnauthorizedError('Incorrect old password');

    user.passwordHash = newPassword;
    await user.save();
    return true;
  },
  async deleteUser(userId: string) {
    const user = await userModel.findByIdAndDelete(userId);
    if (!user) throw new NotFoundError('User not found');
    return true;
  },
  async requestPasswordReset(email: string) {
    const user = await userModel.findOne({ email });

    if (!user) return true;

    if (user.githubId) {
      throw new ConflictError(
        'This account is managed via GitHub. Please log in with GitHub.',
      );
    }

    const { rawValue: resetToken } = await tokenModel.generateToken(
      user._id,
      TokenType.PASSWORD_RESET,
    );

    const resetUrl = `${env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: 'Reset Your Password',
      text: `You requested a password reset. Go here to reset it: ${resetUrl} (Valid for 15 minutes)`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>Hello ${user.name},</p>
          <p>You recently requested to reset your password. Click the button below to proceed.</p>
          <a href="${resetUrl}" style="display:inline-block; padding:12px 24px; color:#ffffff; background-color:#000000; text-decoration:none; border-radius:6px; font-weight:bold; margin: 20px 0;">Reset Password</a>
          <p style="color: #666; font-size: 14px;">If you didn't request this, you can safely ignore this email. This link expires in 15 minutes.</p>
        </div>
      `,
    });

    return true;
  },
  async resetPasswordWithToken(rawToken: string, newPassword: string) {
    const tokenDoc = await tokenService.findValidToken(
      rawToken,
      TokenType.PASSWORD_RESET,
    );
    if (!tokenDoc) {
      throw new UnauthorizedError('Invalid or expired reset token');
    }

    const user = await userModel
      .findById(tokenDoc.userId)
      .select('+passwordHash');
    if (!user) throw new NotFoundError('User not found');

    user.passwordHash = newPassword;
    await user.save();

    await tokenService.markUsed(tokenDoc);

    return true;
  },
  // ------ Email Update  ------
  async requestEmailUpdate(userId: string, newEmail: string) {
    const existingUser = await userModel.findOne({ email: newEmail });
    if (existingUser) throw new ConflictError('This email is already in use');

    const user = await userModel.findById(userId);
    if (!user) throw new NotFoundError('User not found');

    if (user.githubId) {
      throw new ConflictError(
        'Cannot update email for GitHub-linked accounts.',
      );
    }

    user.pendingEmail = newEmail;
    await user.save();

    // Generate token
    const { rawValue: updateToken } = await tokenModel.generateToken(
      user._id,
      TokenType.UPDATE_EMAIL,
    );

    console.log('Generated update token:', updateToken);
    //  Send the email
    const verifyUrl = `${env.FRONTEND_URL}/auth/verify-email?token=${updateToken}`;

    await sendEmail({
      to: user.email,
      subject: 'Authorize Email Change Request',
      text: `You requested to change your email to ${newEmail}. Please authorize this change by clicking this link: ${verifyUrl}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Authorize Email Change</h2>
          <p>Hello ${user.name},</p>
          <p>We received a request to change your account email to <strong>${newEmail}</strong>.</p>
          <p>If you made this request, please click the button below to authorize the update.</p>
          <a href="${verifyUrl}" style="display:inline-block; padding:12px 24px; color:#ffffff; background-color:#000000; text-decoration:none; border-radius:6px; font-weight:bold; margin: 20px 0;">Authorize Change</a>
          <p style="color: #666; font-size: 14px;">This link expires in 15 minutes. If you did not request this, please ignore this email and your account will remain secure.</p>
        </div>
      `,
    });

    return true;
  },

  // user.service.ts
  async verifyEmailUpdate(rawToken: string) {
    console.log('Verifying email update with token:', rawToken);
    const tokenDoc = await tokenModel.findByRawValue(
      rawToken,
      TokenType.UPDATE_EMAIL,
    );
    console.log('tokenDoc:', tokenDoc);
    if (!tokenDoc) {
      throw new UnauthorizedError('Invalid or expired verification token');
    }

    const user = await userModel.findById(tokenDoc.userId);

    if (!user || !user.pendingEmail) {
      throw new NotFoundError('No pending email update found');
    }
    user.email = user.pendingEmail;
    user.pendingEmail = undefined;
    await user.save();

    await tokenDoc.markUsed();
    return true;
  },
};
