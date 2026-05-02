import { model, Schema, Types } from 'mongoose';

export interface IDeploy {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  projectId: Types.ObjectId;

  env: Record<string, string>;
  status: 'pending' | 'building' | 'success' | 'failed';

  logs: string[];
  deployUrl?: string;
  buildPath?: string;

  version: number;
  createdAt: Date;
}

const deploySchema = new Schema<IDeploy>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required.'],
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project Id is required.'],
    },
    env: {
      type: Object,
      default: {},
    },

    status: {
      type: String,
      enum: ['pending', 'building', 'success', 'failed'],
      default: 'pending',
    },

    logs: {
      type: [String],
      default: [],
    },
    deployUrl: String,
    buildPath: String,

    version: {
      type: Number,
      required: [true, 'Version is required.'],
    },
  },
  { timestamps: true },
);

deploySchema.index({ projectId: 1, version: -1 });
deploySchema.index({ userId: 1 });

export const deployModel = model<IDeploy>('Deploy', deploySchema);
