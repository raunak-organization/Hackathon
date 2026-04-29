import { Types } from 'mongoose';
import tokenModel, { TokenDocument, TokenType } from './token.model.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { UnauthorizedError } from '../../utils/appError.js';

const ACCESS_TOKEN_EXPIRY = '15m';

export const tokenService = {
  generateAccessToken(userId: Types.ObjectId): string {
    return jwt.sign({ sub: userId.toString() }, env.JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });
  },

  verifyAccessToken(rawToken: string): JwtPayload {
    const decoded = jwt.verify(rawToken, env.JWT_SECRET);

    if (typeof decoded === 'string') {
      throw new UnauthorizedError('Invalid token.');
    }

    return decoded;
  },

  async findValidToken(
    rawToken: string,
    type: TokenType,
  ): Promise<TokenDocument | null> {
    const tokenDoc = await tokenModel.findByRawValue(rawToken, type);

    if (!tokenDoc || !tokenDoc.isValid()) return null;
    return tokenDoc;
  },

  async markUsed(tokenDoc: TokenDocument) {
    await tokenDoc.markUsed();
  },
};
