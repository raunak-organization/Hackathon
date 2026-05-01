import passport from 'passport';
import { Strategy as GitHubStrategy, Profile } from 'passport-github2';
import { env } from './env.js';
import userModel, { UserDocument } from '../module/user/user.model.js';

type GitHubDone = (err: Error | null, user?: UserDocument | false) => void;

passport.use(
  new GitHubStrategy(
    {
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callbackURL: env.GITHUB_CALLBACK_URL,
      scope: ['user:email'],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: GitHubDone,
    ) => {
      try {
        // 1. Check if user already exists with this GitHub ID
        let user = await userModel.findOne({ githubId: profile.id });

        if (!user) {
          // 2. Fallback: Check if an account exists with the same email
          const email = profile.emails?.[0]?.value;
          if (email) {
            user = await userModel.findOne({ email });
          }

          if (user) {
            user.githubId = profile.id;
            await user.save();
          } else {
            user = await userModel.create({
              name: profile.displayName || profile.username,
              email: email,
              githubId: profile.id,
            });
          }
        }

        // Pass the user to the next middleware
        return done(null, user);
      } catch (error) {
        return done(error as Error, false);
      }
    },
  ),
);

export default passport;
