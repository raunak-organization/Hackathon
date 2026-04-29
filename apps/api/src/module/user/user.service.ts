import { Types } from 'mongoose';
import userModel, { IUser } from './user.model.js';

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
};
