import crypto from 'crypto';
import mongoose, { HydratedDocument, Model, Schema, Types } from 'mongoose';

// ─── Enums ──────────────────────────────────────────────

export enum TokenType {
  PASSWORD_RESET = 'password_reset',
}

// ─── Expiry ─────────────────────────────────────────────
const TOKEN_EXPIRY_MS: Record<TokenType, number> = {
  [TokenType.PASSWORD_RESET]: 15 * 60 * 1000,
};

// ─── Interfaces ─────────────────────────────────────────
export interface IToken {
  userId: Types.ObjectId;
  tokenHash: string;
  type: TokenType;
  expiresAt: Date;
  isUsed: boolean;
  createdAt: Date;
}

export interface ITokenMethods {
  markUsed(): Promise<void>;
  isValid(): boolean;
}

export interface ITokenStatics extends Model<IToken, object, ITokenMethods> {
  generateToken(
    userId: Types.ObjectId,
    type: TokenType,
  ): Promise<{ token: TokenDocument; rawValue: string }>;

  findByRawValue(
    rawValue: string,
    type: TokenType,
  ): Promise<TokenDocument | null>;
}

export type TokenDocument = HydratedDocument<IToken, ITokenMethods>;

// ─── Schema ─────────────────────────────────────────────
const tokenSchema = new Schema<IToken, ITokenStatics, ITokenMethods>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    tokenHash: {
      type: String,
      required: true,
      select: false,
    },

    type: {
      type: String,
      enum: Object.values(TokenType),
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  },
);

// ─── Indexes ────────────────────────────────────────────
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
tokenSchema.index({ userId: 1, type: 1 });
tokenSchema.index({ tokenHash: 1, type: 1 });

// ─── Methods ────────────────────────────────────────────
tokenSchema.methods.isValid = function (): boolean {
  return !this.isUsed && this.expiresAt.getTime() > Date.now();
};

tokenSchema.methods.markUsed = async function (): Promise<void> {
  this.isUsed = true;
  await this.save();
};

// ─── Statics ────────────────────────────────────────────
tokenSchema.statics.generateToken = async function (
  userId: Types.ObjectId,
  type: TokenType,
) {
  const rawValue = crypto.randomBytes(32).toString('hex');

  const tokenHash = crypto.createHash('sha256').update(rawValue).digest('hex');

  const token = await this.create({
    userId,
    tokenHash,
    type,
    expiresAt: new Date(Date.now() + TOKEN_EXPIRY_MS[type]),
  });

  return { token, rawValue };
};

tokenSchema.statics.findByRawValue = function (
  rawValue: string,
  type: TokenType,
) {
  const tokenHash = crypto.createHash('sha256').update(rawValue).digest('hex');

  return this.findOne({ tokenHash, type, isUsed: false }).select('+tokenHash');
};

// ─── Model ──────────────────────────────────────────────
const tokenModel = mongoose.model<IToken, ITokenStatics>('Token', tokenSchema);
export default tokenModel;
