import { Schema, model, HydratedDocument, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { EMAIL_REGEX } from '@repo/zod-config';

// ---- Constants ----------------------------------------
const SALT_ROUNDS = 12;

// ---- Types --------------------------------------------
export interface IUser {
  name: string;
  email: string;
  passwordHash?: string;
  githubId?: string;
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, Record<string, never>, IUserMethods>;

export type UserDocument = HydratedDocument<IUser, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      match: [EMAIL_REGEX, 'Email must be a valid email.'],
    },
    passwordHash: {
      type: String,
      select: false,
      required: function (this: IUser) {
        return !this.githubId;
      },
    },
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true, versionKey: false },
);

// ---- Indexes ------------------------------------------
userSchema.index({ email: 1 }, { unique: true });

// ---- Hooks --------------------------------------------
userSchema.pre('save', async function () {
  if (!this.isModified('passwordHash') || !this.passwordHash) return;
  this.passwordHash = await bcrypt.hash(this.passwordHash, SALT_ROUNDS);
});

// ---- Methods ------------------------------------------
userSchema.methods.comparePassword = async function (
  this: UserDocument,
  password: string,
): Promise<boolean> {
  if (!this.passwordHash) return false;
  return bcrypt.compare(password, this.passwordHash);
};

const userModel = model<IUser, UserModel>('User', userSchema);
export default userModel;
