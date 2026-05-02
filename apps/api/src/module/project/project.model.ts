import { model, Schema, Types } from 'mongoose';

export interface IProject {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  name: string;
  currentDeploymentId?: Types.ObjectId;
  createdAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    currentDeploymentId: {
      type: Schema.Types.ObjectId,
      ref: 'Deploy',
    },
  },
  { timestamps: true },
);

export const projectModel = model<IProject>('Project', projectSchema);
