import { model, Schema, Types } from 'mongoose';

export interface IProject {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  name: string;
  repoUrl: string;
  currentDeploymentId?: Types.ObjectId;
  deploymentCount: number;
  createdAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User Id is required.'],
    },
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
    },
    repoUrl: {
      type: String,
      required: [true, 'Repository URL is required.'],
      trim: true,
    },
    currentDeploymentId: {
      type: Schema.Types.ObjectId,
      ref: 'Deploy',
    },
    deploymentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const projectModel = model<IProject>('Project', projectSchema);
