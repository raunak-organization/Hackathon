import tokenModel, { TokenType } from '../module/token/token.model.js';
import { tokenService } from '../module/token/token.service.js';
import { UserDocument } from '../module/user/user.model.js';

export const generateAuthTokens = async (user: UserDocument) => {
  const { rawValue: refreshToken } = await tokenModel.generateToken(
    user._id,
    TokenType.REFRESH,
  );

  const accessToken = tokenService.generateAccessToken(user._id);

  return { accessToken, refreshToken };
};
