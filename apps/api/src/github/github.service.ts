import crypto from 'crypto';
import { github } from './github.js';
import { userService } from '../module/user/user.service.js';
import { UnauthorizedError } from '../utils/appError.js';
import { generateAuthTokens } from '../utils/tokenHelper.js';

export const githubOAuthService = {
  getAccessToken: async (code: string) => {
    const tokens = await github.validateAuthorizationCode(code);
    return tokens.accessToken();
  },

  getGithubUser: async (accessToken: string) => {
    const res = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'app',
      },
    });

    if (!res.ok) throw new UnauthorizedError('GitHub fetch failed');

    return (await res.json()) as {
      id: number;
      login: string;
      email: string | null;
    };
  },

  findOrCreateUser: async (githubUser: {
    id: number;
    login: string;
    email: string | null;
  }) => {
    const email = githubUser.email || `${githubUser.login}@github.local`;

    let user = await userService.findUserByEmail(email);

    if (!user) {
      user = await userService.createUser({
        name: githubUser.login,
        email,
        githubId: String(githubUser.id),
        passwordHash: crypto.randomUUID(),
      });
    }

    return user;
  },

  loginWithGithub: async (code: string) => {
    const accessToken = await githubOAuthService.getAccessToken(code);
    const githubUser = await githubOAuthService.getGithubUser(accessToken);
    const user = await githubOAuthService.findOrCreateUser(githubUser);

    const tokens = await generateAuthTokens(user);

    return {
      user,
      ...tokens,
    };
  },
};
