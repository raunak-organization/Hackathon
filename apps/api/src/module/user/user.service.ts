import userModel, { IUser } from './user.model.js';

export const userService = {
  async findUserByEmail(email: string) {
    return await userModel.findOne({ email }).select('+passwordHash');
  },

  async createUser(data: Partial<IUser>) {
    return await userModel.create(data);
  },
};
